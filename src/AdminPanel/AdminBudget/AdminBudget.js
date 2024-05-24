import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import { IoIosSearch } from 'react-icons/io';
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const AdminBudget = () => {
    const { user } = useContext(AuthContext);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openBudgetModal, setOpenBudgetModal] = useState(false);
    const [previewData, setPreviewData] = useState("")
    const [eventId, setEventId] = useState("")
    const startDate = new Date();
    const budgetReqDate = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    // console.log(clubRegEndDate, startDate)
    const budgetReqDateNum = startDate.toLocaleDateString();

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
    const { data: budgetData = [], isLoading: budgetDataLoading, refetch: budgetDataRefetch } = useQuery({
        queryKey: ["budgetDataByAdmin", studentInfo?.clubName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/budgetDataByAdmin?clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // const onOpenBudgetModal = (rwdData) => {
    //     setOpenBudgetModal(true)
    //     setGuidEditData(rwdData)

    // }
    const onOpenPreviewModal = (pData) => {
        setOpenPreviewModal(true)
        setPreviewData(pData)
    }
    const onClosePreviewModal = () => {
        setOpenPreviewModal(false)
        setPreviewData("")
    }
    const onOpenBudgetModal = () => {
        setOpenBudgetModal(true)
        setEventId("")
    }
    const onCloseBudgetModal = () => {
        setOpenBudgetModal(false)
        setEventId("")
    }
    const eventIdBlurHandler = (event) => {
        event.preventDefault();
        const eventId = event.target.value.trim();
        setEventId(eventId)
    }
    const { data: eventInfoById = [], isLoading: uidLoading, refetch: uidRefetch } = useQuery({
        queryKey: ["eventInfoById", eventId, studentInfo?.clubName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/eventInfoById?eventId=${eventId}&clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventInfoById)
    const submitBudgetHandler = (event) => {
        event.preventDefault();
        const form = event.target;

        const eventTitle = form.eventTitle.value.trim()

        const budgetMoney = parseInt(form.budget.value.trim())
        const eventDescription = form.description.value.trim()
        const clubName = studentInfo?.clubName
        const eventId = eventInfoById?.eventId
        const eventDate = eventInfoById?.eventDate
        const eventDateNum = eventInfoById?.eventDateNum
        const companyName = eventInfoById?.companyName
        const replyStatus = ""
        const budgetData = {
            clubName, eventTitle, budgetMoney, eventDescription, eventId, budgetReqDate, budgetReqDateNum, eventDate, eventDateNum, companyName, replyStatus
        }
        fetch(`http://localhost:5000/add_budget_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(budgetData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    budgetDataRefetch()
                    setOpenBudgetModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("This event budget reqest already exist ")
                }


            })
    }
    const budgetDeleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deleteBudgetInfo?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            budgetDataRefetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Something Went Wrong",
                            icon: "error"
                        });
                    })


            }
        });

    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome to Budget Request as <span className='font-bold'>{studentInfo?.clubName}</span> Admin</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-center mb-5'>
                    <div className='flex items-center pr-5'>
                        <h1 className='font-semibold'>Request Budget from Club Advisor</h1>
                    </div>
                    <button onClick={onOpenBudgetModal} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Request Budget</button>
                </div>
                <div className='mb-10'>
                    {
                        budgetData.length > 0 ? <div className="overflow-x-auto">
                            <table id="table-to-xls" className="table table-compact w-full">
                                <thead className='bg-[#0A2647] text-white'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Event Id</th>
                                        <th>Title</th>
                                        <th>Event Date</th>
                                        <th>Budget</th>
                                        <th>Reply Satus</th>
                                        <th>Preview</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        budgetData && budgetData.map((data, i) => <tr key={data._id} className="hover">
                                            {/* <th className='bg-white'>{i + 1}</th> */}
                                            <td>{data?.eventId}</td>

                                            <td className=''>{data?.eventTitle}</td>
                                            {/* .slice(0, 35) */}
                                            <td className=''>{data?.eventDate}</td>
                                            <td className=''>{data?.budgetMoney}</td>
                                            {/* <td >{data?.discription}</td> */}
                                            <td className=''>
                                                {
                                                    data?.replyStatus ? <>yes</> : <>no</>
                                                }
                                            </td>
                                            <td className="relative">
                                                <button onClick={() => onOpenPreviewModal(data)} className='relative flex items-center justify-center p-2 bg-blue-500 rounded-full'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                    {/* Conditional Notification Dot */}
                                                    {data?.replyStatus && (
                                                        <span className="absolute top-0 right-0 flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                        </span>
                                                    )}
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => budgetDeleteHandler(data?._id)} className='rounded-full bg-red-500 p-2' >
                                                    <MdDelete className='text-white' />
                                                </button>
                                            </td>

                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {budgetDataLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>

            </div >

            {/* submit handler */}
            {
                openBudgetModal && <Modal open={openBudgetModal} onClose={onCloseBudgetModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitBudgetHandler} action="">

                            <label className=''>
                                <span className="text-sm">Event Id</span>

                                <input onChange={eventIdBlurHandler} name='eventId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required />
                            </label>
                            {
                                eventInfoById?.headline ? <>
                                    <label className=''>
                                        <span className="text-sm">Event Title</span>

                                        <input name='eventTitle' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={eventInfoById?.headline} />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Event Date</span>

                                        <input name='eventDate' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" disabled value={eventInfoById?.eventDate} />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Total estimated budget</span>

                                        <input name='budget' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Event Description</span>

                                        <textarea rows={3} name='description' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={eventInfoById?.eventDetails} />
                                    </label>

                                    <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Update</button>
                                </> : <>
                                    <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-red-500 font-[poppins]  text-justify'>
                                        <h1>Please Insert appropriate event Id which event has advisor approval.</h1>
                                    </div></>
                            }


                        </form>
                    </div>
                </Modal>
            }
            {/* preview */}
            {
                openPreviewModal && <Modal open={openPreviewModal} onClose={onClosePreviewModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <div >
                            <div className='mt-8 p-3 bg-white shadow-md border-l-8 border-[#0A4644] font-[poppins]'>
                                <h1>Event Title: {previewData?.eventTitle}</h1>
                                <h1>Event Date: {previewData?.eventDate}</h1>



                            </div>
                            {/* <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-blue-500 font-[poppins]'>
                                    <h1>Type: {guidEditData?.type}</h1>
                                </div>
                                <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-green-500 font-[poppins]'>
                                    <h1>{guidEditData?.stdDepartment}({guidEditData?.stdSession})</h1>
                                </div> */}
                            <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-[#0A4644] font-[poppins]  text-justify'>
                                <h1>Description: {previewData?.eventDescription}</h1>
                            </div>
                            <div className='mt-2 mb-4 p-3 bg-white shadow-md border-l-8 border-warning font-[poppins] text-justify'>
                                <h1>Reply Message:  {previewData?.replyStatus ? <>{previewData?.replyStatus}</> : <>Not reply yet</>}</h1>
                            </div>


                        </div>
                    </div>
                </Modal>
            }

        </div>
    );
};

export default AdminBudget;