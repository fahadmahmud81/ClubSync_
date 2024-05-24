import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../ContextApi/UserContext';
import Modal from 'react-responsive-modal';
import { MdDelete } from 'react-icons/md';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const AdminGuidance = () => {
    const [searchType, setSearchType] = useState("");
    const [searchReply, setSearchReply] = useState("");
    const { user } = useContext(AuthContext);
    const [openGuidModal, setOpenGuidModal] = useState(false);
    const [openEditGuidModal, setOpenEditGuidModal] = useState(false);
    const [guidEditData, setGuidEditData] = useState("")

    const allClick = () => {
        setSearchType("")
        setSearchReply("")
        // setContentType("all")
    }
    const textHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const type = form.type.value;
        const reply = form.reply.value;
        setSearchType(type)
        setSearchReply(reply)
    }
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
    const { data: guidanceData = [], isLoading: guidanceDataLoading, refetch: guidanceDataRefetch } = useQuery({
        queryKey: ["guidanceDataByAdmin", studentInfo?.clubName, searchType, searchReply],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/guidanceDataByAdmin?clubName=${studentInfo?.clubName}&searchType=${searchType}&searchReply=${searchReply}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // console.log(guidanceData)
    const onCloseGuidModal = () => {
        setOpenGuidModal(false)
        // setUpdateStatus("")

    }
    const onOpenEditGuidModal = (rwdData) => {
        setOpenEditGuidModal(true)
        setGuidEditData(rwdData)

    }
    const onCloseEditGuidModal = () => {
        setOpenEditGuidModal(false)
    }

    const submitGuidEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const reply = form.reply.value
        const clubName = studentInfo?.clubName
        const mongodbId = guidEditData?._id
        const editData = {
            clubName, reply, mongodbId
        }
        fetch('http://localhost:5000/editGuidanceReply', {
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
                    setOpenEditGuidModal(false)

                    guidanceDataRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }

    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome to Guidance as <span className='font-bold'>{studentInfo?.clubName}</span> Admin</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-between pb-5'>
                    <div className='flex gap-x-5'>
                        <div>
                            <button onClick={allClick} className={` font-semibold ${searchType === "" && searchReply === "" ? 'text-blue-500' : ''}`}>All</button>
                        </div>
                        <div>
                            {
                                guidanceData?.length > 0 && <div>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="text-green-500 hover:text-blue-500  hover:duration-500 hover:tracking-wider"
                                        table="table-to-xls"
                                        filename="GuidanceFile"
                                        sheet="GuidanceFile"
                                        buttonText="Export Excel" />
                                </div>
                            }
                        </div>
                    </div>


                    <div className=''>
                        <form onSubmit={textHandler} action="" className='flex gap-2'>


                            <select name='type' className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" required>

                                <option value='Career Guidance'>Career Guidance</option>
                                <option value='Seminar Request'>Seminar Request</option>
                                <option value='Others'>Others</option>
                                <option value='all'>All</option>


                            </select>
                            <select name='reply' className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" required >

                                <option value='yes'>Reply Status: yes</option>
                                <option value='no'>Reply Status: no</option>


                            </select>

                            {/* <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By Title' /> */}


                            <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                        </form>
                    </div>
                </div>
                <div className='mb-10'>
                    {
                        guidanceData.length > 0 ? <div className="overflow-x-auto">
                            <table id="table-to-xls" className="table table-compact w-full">
                                <thead className='bg-[#0A2647] text-white'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Subject</th>
                                        <th>Type</th>
                                        <th>Session</th>
                                        <th>Department</th>
                                        <th className='hidden'>Description</th>
                                        <th>Reply</th>
                                        <th>Message</th>
                                        {/* <th>Preview</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        guidanceData && guidanceData.map((data, i) => <tr key={data._id} className="hover">
                                            {/* <th className='bg-white'>{i + 1}</th> */}
                                            <td>{data?.subject}</td>

                                            <td className=''>{data?.type}</td>
                                            {/* .slice(0, 35) */}
                                            <td className=''>{data?.stdSession}</td>
                                            <td className=''>{data?.stdDepartment}</td>
                                            <td className='hidden'>{data?.discription}</td>
                                            <td className=''>
                                                {
                                                    data?.reply === "no" ? <>{data?.reply}</> : <>yes</>
                                                }
                                            </td>

                                            <td>
                                                <button onClick={() => onOpenEditGuidModal(data)} className='rounded-full bg-green-500 p-2' >
                                                    <AiOutlineEdit className='text-white' />
                                                </button>
                                            </td>
                                            {/* <td>
                                                <button className='rounded-full bg-blue-500 p-2'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button>
                                            </td> */}
                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {guidanceDataLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>


                {/* edit handler */}
                {
                    openEditGuidModal && <Modal open={openEditGuidModal} onClose={onCloseEditGuidModal} center classNames={{ modal: 'rounded-xl' }}>
                        <div className='mt-10 lg:w-[600px] '>
                            <form onSubmit={submitGuidEditHandler} action="">
                                <div className='mt-8 p-3 bg-white shadow-md border-l-8 border-[#0A4644] font-[poppins]'>
                                    <h1>Subject: {guidEditData?.subject}</h1>
                                    <h1>Type: {guidEditData?.type}</h1>
                                    <h1>Department: {guidEditData?.stdDepartment}({guidEditData?.stdSession})</h1>


                                </div>
                                {/* <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-blue-500 font-[poppins]'>
                                    <h1>Type: {guidEditData?.type}</h1>
                                </div>
                                <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-green-500 font-[poppins]'>
                                    <h1>{guidEditData?.stdDepartment}({guidEditData?.stdSession})</h1>
                                </div> */}
                                <div className='mt-2 p-3 bg-white shadow-md border-l-8 border-[#0A4644] font-[poppins]  text-justify'>
                                    <h1>Description: {guidEditData?.discription}</h1>
                                </div>
                                <div className='mt-2 mb-4 p-3 bg-white shadow-md border-l-8 border-warning font-[poppins] text-justify'>
                                    <h1>Reply Message: {guidEditData?.reply}</h1>
                                </div>

                                <label className=''>
                                    <span className="text-sm font-[poppins] ">Reply to the student</span>

                                    <textarea rows={3} name='reply' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1 font-[poppins] " required defaultValue={guidEditData?.reply} />
                                </label>

                                <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Update</button>

                            </form>
                        </div>
                    </Modal>
                }
            </div >
        </div >
    );
};

export default AdminGuidance;