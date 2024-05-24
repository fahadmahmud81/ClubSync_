import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete, MdOutlineEmail } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const EventMemberInfo = () => {
    const { user } = useContext(AuthContext)
    const [searchId, setSearchId] = useState("")
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [updateStatus, setUpdateStatus] = useState("")
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
    const textIdHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value.trim();
        setSearchId(search)
    }
    const { data: eventRegInfo = [], isLoading: eventRegInfoLoading, refetch: eventRegInfoRefetch } = useQuery({
        queryKey: ["eventRegInfoByClub", studentInfo?.clubName, searchId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/eventRegInfoByClub?clubName=${studentInfo?.clubName}&eventId=${searchId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventRegInfo)
    const onOpenStatusModal = (statusData) => {
        setUpdateStatus(statusData)
        setOpenStatusModal(true)

    }
    const onCloseStatusModal = () => {
        setOpenStatusModal(false)
        setUpdateStatus("")

    }
    const submitStatusUpdateHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const certificateStatus = form.certificateStatus.value;
        const mongodbId = updateStatus?._id
        const statusData = {
            mongodbId,
            certificateStatus
        }
        fetch('http://localhost:5000/updateCertificateStatus', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(statusData),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.modifiedCount === 1) {
                    // console.log(data)
                    setOpenStatusModal(false)

                    eventRegInfoRefetch()
                    toast.success("Update successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenStatusModal(false)
                    toast.error("Error")
                }
            })
    }
    const allClick = () => {
        setSearchId("")
        // setContentType("all")
    }
    return (
        <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
            <div className='flex justify-between pb-5'>
                <button onClick={allClick} className={` font-semibold ${searchId === "" ? 'text-blue-500' : ''}`}>All</button>
                {
                    searchId && <div className='flex items-center'>
                        <h1>Total Registration Members for Event ID_{searchId}: <span className='font-bold text-lg text-red-500'>{eventRegInfo?.length}</span></h1>
                    </div>
                }
                <div className=''>
                    <form onSubmit={textIdHandler} action="" className='flex gap-2'>
                        <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By Event Id' />


                        <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                    </form>
                </div>
            </div>
            <div className='mb-10'>
                {
                    eventRegInfo.length > 0 ? <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead className='bg-[#0A2647] text-white'>
                                <tr>
                                    {/* <th></th> */}
                                    <th>Event id</th>
                                    <th>Short Headline</th>
                                    <th>Name</th>

                                    <th >Phone</th>
                                    <th>Email</th>

                                    <th>Certi. Status</th>

                                    <th>Update Status</th>
                                    {/* <th>Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventRegInfo && eventRegInfo.map((data, i) => <tr key={data._id} className="hover">
                                        {/* <th className='bg-white'>{i + 1}</th> */}
                                        <td>{data?.eventId}</td>

                                        <td className=''>{data?.sortHeadline}</td>
                                        <td>{data?.stdName}({data?.uid})</td>
                                        {/* <td className=''>{data?.stdEmail}</td> */}

                                        <td className=''>{data?.stdPhone}</td>
                                        <td className="tooltip" data-tip={data?.stdEmail} >
                                            <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${data?.stdEmail}`} target="_blank">
                                                <button className='rounded-full bg-blue-500 p-2'>
                                                    <MdOutlineEmail className='text-white' />
                                                </button></Link>
                                        </td>
                                        {
                                            data?.isCertificate === "yes" ? <td className=''>
                                                <h1>{data?.status}</h1>
                                            </td> : <td className=''>
                                                <h1>No Certificate</h1>
                                            </td>
                                        }
                                        {
                                            data?.isCertificate === "yes" ? <td>
                                                <button className='rounded-full bg-green-500 p-2' onClick={() => onOpenStatusModal(data)}>
                                                    <AiOutlineEdit className='text-white' />
                                                </button>
                                            </td> : <td className=''>
                                                <h1>No Certificate</h1>
                                            </td>
                                        }



                                        {/* <td className=''>
                                            <button className='rounded-full bg-red-500 p-2'>
                                                <MdDelete className='text-white' />
                                            </button>
                                        </td> */}
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div> : <div>
                        {eventRegInfoLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                            <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                        }
                    </div>
                }

            </div>
            {/* edit certificate status */}
            {
                openStatusModal && <Modal open={openStatusModal} onClose={onCloseStatusModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[400px] '>
                        <form onSubmit={submitStatusUpdateHandler} action="">

                            <label className=''>
                                <span className="text-sm">Update Certificate Status</span>
                                <select name='certificateStatus' className="mt-1 rounded-md mb-14 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required >


                                    <option value='approved'>approved</option>
                                    <option value='decline'>decline</option>


                                </select>
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Update Status</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default EventMemberInfo;