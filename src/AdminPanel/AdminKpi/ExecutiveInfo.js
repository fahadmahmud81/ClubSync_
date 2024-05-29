import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { IoIosSearch } from 'react-icons/io';
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaFacebook } from 'react-icons/fa';
import { MdDelete, MdEmail, MdOutlineEmail } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';

const ExecutiveInfo = () => {
    const [searchText, setSearchText] = useState("");
    const { user } = useContext(AuthContext);
    const [openExModal, setOpenExModal] = useState(false);
    const [openEditExModal, setOpenEditExModal] = useState(false);
    const [exEditData, setExEditData] = useState("")
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
    const textHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value.trim();
        setSearchText(search)
    }
    const allClick = () => {
        setSearchText("")
        // setContentType("all")
    }
    const onCloseExModal = () => {
        setOpenExModal(false)
        // setUpdateStatus("")

    }
    const onOpenEditExModal = (exData) => {
        setOpenEditExModal(true)
        setExEditData(exData)

    }
    const onCloseEditExModal = () => {
        setOpenEditExModal(false)
    }
    const { data: executiveData = [], isLoading: executiveDataLoading, refetch: executiveDataRefetch } = useQuery({
        queryKey: ["executiveDataByAdmin", studentInfo?.clubName, searchText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/executiveDataByAdmin?clubName=${studentInfo?.clubName}&searchText=${searchText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    const submitExHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const memberName = form.memberName.value;
        const memberUid = form.memberUid.value;
        const memberDepartment = form.memberDepartment.value;
        const memberSession = form.memberSession.value;
        const memberEmail = form.memberEmail.value;
        const memberPhone = form.memberPhone.value;
        const designation = form.designation.value;
        const memberImage = form.memberImage.value;
        const fbLink = form.fbLink.value;
        const linkedinLink = form.linkedinLink.value;
        const memberRank = parseInt(form.memberRank.value.trim());
        const clubName = studentInfo?.clubName
        const submitData = {
            memberName, memberUid, memberDepartment, memberSession, memberEmail, memberPhone, designation, memberImage, fbLink, linkedinLink, clubName, memberRank
        }
        fetch(`http://localhost:5000/add_executive_member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(submitData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    executiveDataRefetch()
                    setOpenExModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Error")
                }


            })

    }
    const submitExEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const memberName = form.memberName.value;
        const memberUid = form.memberUid.value;
        const memberDepartment = form.memberDepartment.value;
        const memberSession = form.memberSession.value;
        const memberEmail = form.memberEmail.value;
        const memberPhone = form.memberPhone.value;
        const designation = form.designation.value;
        const memberImage = form.memberImage.value;
        const fbLink = form.fbLink.value;
        const linkedinLink = form.linkedinLink.value;
        const memberRank = parseInt(form.memberRank.value.trim());
        const clubName = studentInfo?.clubName
        const mongodbId = exEditData?._id
        const editData = {
            memberName, memberUid, memberDepartment, memberSession, memberEmail, memberPhone, designation, memberImage, fbLink, linkedinLink, clubName, memberRank, mongodbId
        }
        fetch('http://localhost:5000/editExecutiveData', {
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
                    setOpenEditExModal(false)

                    executiveDataRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }
    const exDeleteHandler = (id) => {
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
                fetch(`http://localhost:5000/deleteExecutiveInfo?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            executiveDataRefetch()
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
        <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
            <div className='flex justify-between pb-5'>
                <button onClick={allClick} className={` font-semibold ${searchText === "" ? 'text-blue-500' : ''}`}>All</button>
                <div className='flex justify-center '>
                    <div className='flex items-center pr-5'>
                        <h1 className='font-semibold'>Add executive Member from here</h1>
                    </div>
                    <button onClick={() => setOpenExModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Add Member</button>
                </div>
                <div className=''>
                    <form onSubmit={textHandler} action="" className='flex gap-2'>
                        <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By Name' />


                        <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                    </form>
                </div>
            </div>
            <div className='mb-10'>
                {
                    executiveData.length > 0 ? <div className="overflow-x-auto">
                        <table className="table table-compact table-zebra border rounded-2xl  w-full">
                            <thead className='bg-[#0A2647] text-white'>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>UID</th>

                                    <th>Email</th>
                                    <th>Facebook</th>



                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    executiveData && executiveData.map((data, i) => <tr key={data._id} className="hover">
                                        <th className=''>{data?.memberRank}</th>


                                        <td className=''>{data?.memberName}</td>
                                        <td className=''>{data?.designation}</td>
                                        <td className=''>{data?.memberUid}</td>
                                        <td className=''>
                                            <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${data?.memberEmail}`} target="_blank">
                                                <button className='rounded-full bg-[#c71610] p-2'>
                                                    <MdEmail className='text-white' />
                                                </button></Link>
                                        </td>
                                        {/* .slice(0, 35) */}
                                        <td>
                                            <Link to={data?.fbLink} target="_blank">
                                                <button className='rounded-full bg-[#1877F2] p-2'>
                                                    <FaFacebook className='text-white' />
                                                </button></Link>
                                        </td>

                                        <td>
                                            <button onClick={() => onOpenEditExModal(data)} className='rounded-full bg-[#008CBA] p-2' >
                                                <AiOutlineEdit className='text-white' />
                                            </button>
                                        </td>

                                        <td className=''>
                                            <button onClick={() => exDeleteHandler(data?._id)} className='rounded-full bg-[#f44336] p-2'>
                                                <MdDelete className='text-white' />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div> : <div>
                        {executiveDataLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                            <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                        }
                    </div>
                }

            </div>
            {
                openExModal && <Modal open={openExModal} onClose={onCloseExModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] font-[poppins]'>
                        <form onSubmit={submitExHandler} action="">
                            <label className=''>
                                <span className="text-sm font-semibold">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Name</span>

                                <input name='memberName' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">University Id</span>

                                <input name='memberUid' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Department</span>
                                <select name='memberDepartment' className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required>

                                    <option value='Educational Technology'>Educational Technology</option>
                                    <option value='IOT & Robotics Engineering'>IOT & Robotics Engineering</option>
                                    <option value='Data Science'>Data Science</option>
                                    <option value='Software Engineering'>Software Engineering</option>
                                    <option value='Cyber Security'>Cyber Security</option>
                                </select>
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Session</span>
                                <select name='memberSession' className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required>
                                    <option value=''>Select a Session</option>
                                    <option value='2018-19'>2018-19</option>
                                    <option value='2019-20'>2019-20</option>
                                    <option value='2020-21'>2020-21</option>
                                    <option value='2021-22'>2021-22</option>
                                </select>
                            </label>

                            <label className=''>
                                <span className="text-sm font-semibold">Designation</span>

                                <input name='designation' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Rank No.</span>

                                <input name='memberRank' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Email </span>

                                <input name='memberEmail' type="email" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Contact No. </span>
                                <input name='memberPhone' type="tel" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Profile Image Link </span>

                                <input name='memberImage' type="url" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Facebook Link </span>

                                <input name='fbLink' type="url" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Linkedin Link </span>

                                <input name='linkedinLink' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Data</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* edit */}
            {
                openEditExModal && <Modal open={openEditExModal} onClose={onCloseEditExModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] font-[poppins]'>
                        <form onSubmit={submitExEditHandler} action="">
                            <label className=''>
                                <span className="text-sm font-semibold">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Name</span>

                                <input name='memberName' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberName} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">University Id</span>

                                <input name='memberUid' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberUid} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Department</span>
                                <select name='memberDepartment' className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberDepartment}>

                                    <option value='Educational Technology'>Educational Technology</option>
                                    <option value='IOT & Robotics Engineering'>IOT & Robotics Engineering</option>
                                    <option value='Data Science'>Data Science</option>
                                    <option value='Software Engineering'>Software Engineering</option>
                                    <option value='Cyber Security'>Cyber Security</option>
                                </select>
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Session</span>
                                <select name='memberSession' className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberSession}>
                                    <option value=''>Select a Session</option>
                                    <option value='2018-19'>2018-19</option>
                                    <option value='2019-20'>2019-20</option>
                                    <option value='2020-21'>2020-21</option>
                                    <option value='2021-22'>2021-22</option>
                                </select>
                            </label>

                            <label className=''>
                                <span className="text-sm font-semibold">Designation</span>

                                <input name='designation' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.designation} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Rank No.</span>

                                <input name='memberRank' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberRank} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Email </span>

                                <input name='memberEmail' type="email" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberEmail} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Contact No. </span>
                                <input name='memberPhone' type="tel" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberPhone} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Profile Image Link </span>

                                <input name='memberImage' type="url" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.memberImage} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Facebook Link </span>

                                <input name='fbLink' type="url" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.fbLink} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Linkedin Link </span>

                                <input name='linkedinLink' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={exEditData?.linkedinLink} />
                            </label>



                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Edit</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default ExecutiveInfo;