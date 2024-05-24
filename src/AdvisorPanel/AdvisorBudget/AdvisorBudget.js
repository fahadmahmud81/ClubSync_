import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import { FaMessage } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';

const AdvisorBudget = () => {
    const { user } = useContext(AuthContext);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [previewData, setPreviewData] = useState("");
    const [updateData, setUpdateData] = useState("")
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
    const { data: budgetData = [], isLoading: budgetDataLoading, refetch: budgetDataRefetch } = useQuery({
        queryKey: ["budgetDataByAdvisor", studentInfo?.clubName, selectStatus],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/budgetDataByAdvisor?clubName=${studentInfo?.clubName}&replyStatus=${selectStatus}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    const onOpenPreviewModal = (pData) => {
        setOpenPreviewModal(true)
        setPreviewData(pData)
    }
    const onClosePreviewModal = () => {
        setOpenPreviewModal(false)
        setPreviewData("")
    }
    const onOpenUpdateModal = (udata) => {
        setOpenUpdateModal(true)
        setUpdateData(udata)
    }
    const onCloseUpdateModal = () => {
        setOpenUpdateModal(false)
        setUpdateData("")
    }
    const submitStatusUpdateHandler = (event) => {
        event.preventDefault()
        const form = event.target;

        const replyStatus = form.replyStatus.value.trim()
        const mongodbId = updateData?._id
        const editData = {
            replyStatus, mongodbId
        }
        fetch('http://localhost:5000/updateBugetReplyStatus', {
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
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    budgetDataRefetch()
                    setOpenUpdateModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Error")
                }


            })
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome to Budget Section as <span className='font-bold'>{studentInfo?.clubName}</span> Advisor</h1>
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
                                <option disabled>Select Message Status</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>




                            </select>


                            <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                        </form>
                    </div>
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
                                        <th>Message</th>

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
                                            <td>
                                                <button onClick={() => onOpenPreviewModal(data)} className='rounded-full bg-green-500 p-2'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => onOpenUpdateModal(data)} className='rounded-full bg-blue-500 p-2'>
                                                    <FaMessage className='text-white' />
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
                openUpdateModal && <Modal open={openUpdateModal} onClose={onCloseUpdateModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[400px] '>
                        <form onSubmit={submitStatusUpdateHandler} action="">

                            <label className=''>
                                <span className="text-sm">Message To Club Admin</span>
                                <textarea rows={3} name='replyStatus' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={updateData?.replyStatus} />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Update Status</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* preview */}
            {
                openPreviewModal && (
                    <Modal open={openPreviewModal} onClose={onClosePreviewModal} center classNames={{ modal: 'rounded-xl' }}>
                        <div className='mt-10 lg:w-[700px]'>
                            <div className="border p-6 rounded-md text-justify bg-white shadow-lg font-[Calibri]">
                                <div className="border-b pb-4 mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Budget Request for {previewData.eventTitle}</h2>
                                    <h3 className="text-lg font-semibold text-gray-600">by {previewData.clubName}</h3>
                                </div>
                                <p className="mb-4">Dear Advisor,</p>
                                <p className="mb-4">I am writing to request a budget for an upcoming event organized by {previewData.clubName}. Below are the details of the event and the budget requirements:</p>
                                <ul className="list-disc ml-6 mb-4 space-y-2">
                                    <li><strong>Event Title:</strong> {previewData.eventTitle}</li>
                                    <li><strong>Event Date:</strong> {previewData.eventDate}</li>
                                    <li><strong>Event Description:</strong> {previewData.eventDescription}</li>
                                    <li><strong>Event ID:</strong> {previewData.eventId}</li>
                                    <li><strong>Company Name:</strong> {previewData.companyName}</li>
                                </ul>
                                <p className="mb-4"><strong>Budget Request Date:</strong> {previewData.budgetReqDate}</p>
                                <p className="mb-4"><strong>Requested Budget:</strong> <span className='font-semibold'>{previewData.budgetMoney} Taka</span></p>
                                <p className="mb-4">We assure you that the funds will be utilized judiciously and in line with the objectives of both our club and your company. Additionally, we are open to any suggestions or modifications to the budget plan as per your guidelines.</p>
                                <p className="mb-4">Please find attached any supporting documents or proposals related to the event.</p>
                                <p className="mb-4">We kindly request your prompt attention to this matter as we need to finalize the budget to proceed with the event planning.</p>
                                <p>Thank you for considering our request. We look forward to your favorable response.</p>
                                <p className="mt-4">Sincerely,</p>
                                <p>{previewData.clubName}</p>
                            </div>
                        </div>
                    </Modal>
                )
            }


        </div>
    );
};

export default AdvisorBudget;