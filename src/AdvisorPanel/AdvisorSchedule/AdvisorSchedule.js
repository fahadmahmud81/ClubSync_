import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { FaExternalLinkAlt } from 'react-icons/fa';

const AdvisorSchedule = () => {
    const { user } = useContext(AuthContext);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [scheduleData, setScheduleData] = useState("")
    const [selectStatus, setSelectStatus] = useState("")
    const { data: studentInfo = [], isLoading: studentInfoLoading, refetch: studentInfoRefetch } = useQuery({
        queryKey: ["studentInfo", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/studentInfo?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const allClick = () => {
        setSelectStatus("")
        // setContentType("all")
    }
    const textHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const advisorApproval = form.status.value;

        setSelectStatus(advisorApproval)
    }
    const { data: eventInfo = [], isLoading: eventInfoLoading, refetch: eventInfoRefetch } = useQuery({
        queryKey: ["eventInfoByAdvisor", selectStatus],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/eventInfoByAdvisor?advisorApproval=${selectStatus}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventInfo)
    const onOpenScheduleModal = (pData) => {
        setOpenScheduleModal(true)
        setScheduleData(pData)
    }
    const onCloseScheduleModal = () => {
        setOpenScheduleModal(false)
        setScheduleData("")
    }
    const advisorApprovalHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const advisorApproval = form.advisorApproval.value
        const mongodbId = scheduleData?._id
        const editData = {
            advisorApproval, mongodbId
        }
        fetch('http://localhost:5000/updateAdviosrApproval', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(editData),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.modifiedCount === 1) {
                    // console.log(data)
                    setOpenScheduleModal(false)

                    eventInfoRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }

    return (
        <div className='bg-[#F2F2F2] pl-3 h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome {studentInfo?.stdName} as <span className='font-bold'>{studentInfo?.clubName}</span> Advisor</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-between pb-5'>
                    <div className='flex '>
                        <div>
                            <button onClick={allClick} className={` font-semibold ${selectStatus === "" ? 'text-blue-500' : ''}`}>All</button>
                        </div>

                    </div>


                    <div className=''>
                        <form onSubmit={textHandler} action="" className='flex gap-x-2'>


                            <select name='status' className=" rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" required>
                                <option disabled>Select Approval Status</option>
                                <option value='approved'>Approved</option>
                                <option value='decline'>Decline</option>
                                <option value='pending'>Pending</option>



                            </select>


                            <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                        </form>
                    </div>
                </div>
                <div className='mb-10'>
                    {
                        eventInfo.length > 0 ? <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead className='bg-[#0A2647] text-white'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Event id</th>
                                        <th>Short Headline</th>
                                        <th>Club Name</th>
                                        <th>Event Date</th>
                                        <th>Event Time</th>
                                        <th >Approve Status</th>

                                        <th>Edit</th>




                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        eventInfo && eventInfo.map((data, i) => <tr key={data._id} className="hover">
                                            {/* <th className='bg-white'>{i + 1}</th> */}
                                            <td>{data?.eventId}</td>

                                            <td className=''>{data?.sortHeadline}</td>
                                            <td className=''>{data?.clubName}</td>

                                            <td>{data?.eventDate}</td>
                                            <td className=''>{data?.eventTime}</td>

                                            <td className=''>{data?.advisorApproval}</td>
                                            {
                                                data?.clubName === studentInfo?.clubName ? <td><button onClick={() => onOpenScheduleModal(data)} className='rounded-full bg-green-500 p-2'  >
                                                    <AiOutlineEdit className='text-white' />
                                                </button> </td> : <td><button onClick={() => onOpenScheduleModal(data)} className='rounded-full bg-blue-500 p-2'  >
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button></td>
                                            }



                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {eventInfoLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>
            </div>
            {/* update modal */}
            {
                openScheduleModal && <Modal open={openScheduleModal} onClose={onCloseScheduleModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={advisorApprovalHandler} action=''>
                            <div className='mt-8 mb-5 p-3 bg-white shadow-md  font-[poppins] '>
                                <img className='w-full h-[270px] rounded-lg' src={scheduleData?.eventBanner} alt="" />
                                <div className='flex justify-between mt-3 rounded-md'>
                                    <h1>{scheduleData?.clubName}</h1>
                                    <h1 className='font-sm '>🕒 {scheduleData?.eventDate} at {scheduleData?.eventTime}</h1>
                                    {/* text-[#CFD1D6] */}
                                </div>
                                <div className='bg-[#F2F2F2] tracking-wider p-3 mt-3'>
                                    <h1>{scheduleData?.headline}</h1>

                                </div>
                                <div className='bg-[#F2F2F2]  p-3 mt-3 rounded-md'>
                                    <h1 className='text-justify'>{scheduleData?.eventDetails}</h1>
                                    <div className='flex justify-end mt-3'>
                                        <h1 >Collaboration With <span className='font-bold'>{scheduleData?.companyName}</span></h1>
                                    </div>

                                </div>
                                <div className='flex justify-between border   p-3 mt-3 rounded-md'>
                                    <h1>Submission Details:</h1>
                                    <div>
                                        <h1 className=''> {scheduleData?.eventApplyDate}</h1>

                                        <h1 >{scheduleData?.eventApplyTime}</h1>
                                    </div>
                                </div>
                            </div>
                            {
                                scheduleData?.clubName === studentInfo?.clubName && <div className='mt-8 mb-5 p-3 bg-white shadow-md  font-[poppins]'>
                                    <div className='bg-[#F2F2F2] p-3 rounded-md'>
                                        <label className=''>
                                            <span className="text-sm">Update Approve Status</span>
                                            <select name='advisorApproval' className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={scheduleData?.advisorApproval} >

                                                <option value='approved' >Approved</option>
                                                <option value='decline'>Decline</option>
                                                <option value='pending'>pending</option>


                                            </select>
                                        </label>
                                        <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Update</button>
                                    </div>
                                </div>
                            }





                        </form>
                    </div>
                </Modal>
            }
        </div >
    );
};

export default AdvisorSchedule;