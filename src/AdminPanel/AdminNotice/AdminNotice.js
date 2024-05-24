import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AdminNotice = () => {
    const { user } = useContext(AuthContext)
    const [searchId, setSearchId] = useState("")
    const [openNoticeModal, setOpenNoticeModal] = useState(false);
    const [openEditNoticeModal, setOpenEditNoticeModal] = useState(false);
    const [noticeEditData, setNoticeEditData] = useState("")
    const startDate = new Date();
    const noticeDate = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    // console.log(clubRegEndDate, startDate)
    const noticeDateNum = startDate.toLocaleDateString();

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
        setSearchId("")
        // setContentType("all")
    }
    const textIdHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value.trim();
        setSearchId(search)
    }
    const { data: noticeInfo = [], isLoading: noticeInfoLoading, refetch: noticeInfoRefetch } = useQuery({
        queryKey: ["getNoticeByClub", studentInfo?.clubName, searchId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/getNoticeByClub?clubName=${studentInfo?.clubName}&noticeId=${searchId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(noticeInfo)
    const onCloseNoticeModal = () => {
        setOpenNoticeModal(false)
        // setUpdateStatus("")

    }
    const onOpenEditNoticeModal = (noticeData) => {
        setOpenEditNoticeModal(true)
        setNoticeEditData(noticeData)

    }
    const onCloseEditNoticeModal = () => {
        setOpenEditNoticeModal(false)
    }
    const submitNoticeHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const noticeId = parseInt(form.noticeId.value.trim());
        const headline = form.headline.value
        const noticeDetails = form.noticeDetails.value
        const clubLogo = form.clubLogo.value
        const clubName = studentInfo?.clubName
        const noticeData = {
            clubName, clubLogo, noticeDetails, headline, noticeId, noticeDate, noticeDateNum
        }
        fetch(`http://localhost:5000/add_notice_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(noticeData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    noticeInfoRefetch()
                    setOpenNoticeModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Provide unique Notice Id ")
                }


            })
    }
    const noticeDeleteHandler = (id) => {
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
                fetch(`http://localhost:5000/deleteNoticeInfo?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            noticeInfoRefetch()
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
    const noticeEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const noticeId = parseInt(form.noticeId.value.trim());
        const headline = form.headline.value
        const noticeDetails = form.noticeDetails.value
        const clubLogo = form.clubLogo.value
        const clubName = studentInfo?.clubName
        const mongodbNoticeId = noticeEditData?._id;
        const editData = {
            clubLogo, noticeDetails, headline, noticeId, clubName, mongodbNoticeId
        }
        fetch('http://localhost:5000/editNoticeData', {
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
                    setOpenEditNoticeModal(false)

                    noticeInfoRefetch()
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
                <h1>Welcome to notice as <span className='font-bold'>{studentInfo?.clubName}</span> Admin</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-between pb-5'>
                    <button onClick={allClick} className={` font-semibold ${searchId === "" ? 'text-blue-500' : ''}`}>All</button>
                    <div className='flex justify-center '>
                        <div className='flex items-center pr-5'>
                            <h1 className='font-semibold'>Add notice from here</h1>
                        </div>
                        <button onClick={() => setOpenNoticeModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Add Notice</button>
                    </div>
                    <div className=''>
                        <form onSubmit={textIdHandler} action="" className='flex gap-2'>
                            <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By notice Id' />


                            <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                        </form>
                    </div>
                </div>
                <div className='mb-10'>
                    {
                        noticeInfo.length > 0 ? <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead className='bg-[#0A2647] text-white'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Notice id</th>
                                        <th>Headline</th>
                                        <th>Notice Date</th>



                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        noticeInfo && noticeInfo.map((data, i) => <tr key={data._id} className="hover">
                                            {/* <th className='bg-white'>{i + 1}</th> */}
                                            <td>{data?.noticeId}</td>

                                            <td className=''>{data?.headline}</td>
                                            <td>{data?.noticeDate}</td>
                                            {/* <td className=''>{data?.stdEmail}</td> */}
                                            <td>
                                                <button onClick={() => onOpenEditNoticeModal(data)} className='rounded-full bg-green-500 p-2'>
                                                    <AiOutlineEdit className='text-white' />
                                                </button>
                                            </td>

                                            <td className=''>
                                                <button onClick={() => noticeDeleteHandler(data?._id)} className='rounded-full bg-red-500 p-2'>
                                                    <MdDelete className='text-white' />
                                                </button>
                                            </td>
                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {noticeInfoLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>
            </div>
            {/* insert handler */}
            {
                openNoticeModal && <Modal open={openNoticeModal} onClose={onCloseNoticeModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitNoticeHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Id</span>

                                <input name='noticeId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Headline</span>

                                <input name='headline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Details</span>

                                <textarea rows={3} name='noticeDetails' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Logo Link</span>

                                <input name='clubLogo' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.clubLogo} />
                            </label>


                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Notice</button>

                        </form>
                    </div>
                </Modal>
            }

            {/* edit handler */}
            {
                openEditNoticeModal && <Modal open={openEditNoticeModal} onClose={onCloseEditNoticeModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={noticeEditHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Id</span>

                                <input name='noticeId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" disabled value={noticeEditData?.noticeId} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Headline</span>

                                <input name='headline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={noticeEditData?.headline} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Notice Details</span>

                                <textarea rows={3} name='noticeDetails' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={noticeEditData?.noticeDetails} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Logo Link</span>

                                <input name='clubLogo' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={noticeEditData?.clubLogo} />
                            </label>


                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Edit Notice</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default AdminNotice;