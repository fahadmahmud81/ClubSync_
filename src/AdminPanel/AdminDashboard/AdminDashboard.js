import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import { IoIosSearch } from 'react-icons/io';
import { MdDelete, MdOutlineEmail } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-responsive-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext)
    const [details, setDetails] = useState("")
    const [searchId, setSearchId] = useState("")
    const [openClubModal, setOpenClubModal] = useState(false);
    const [openClubEditModal, setOpenClubEditModal] = useState(false);
    const [clubId, setClubId] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [editDate, setEditDate] = useState(null);
    const clubRegEndDate = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    // console.log(clubRegEndDate, startDate)
    const clubRegEndDateNum = startDate.toLocaleDateString();
    // console.log(eventRegistrationDateNum)
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
    const { data: clubRegStdLen = [], isLoading: clubRegStdLenLoading, refetch: clubRegStdLenRefetch } = useQuery({
        queryKey: ["club_reg_std_data_len", studentInfo?.clubName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/club_reg_std_data_len?clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const { data: clubRegStdInfo = [], isLoading: clubRegStdInfoLoading, refetch: clubRegStdInfoRefetch } = useQuery({
        queryKey: ["club_reg_std_data", studentInfo?.clubName, searchId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/club_reg_std_data?clubName=${studentInfo?.clubName}&searchId=${searchId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const { data: clubInfoByClubName = [], isLoading: clubInfoByClubNameLoading, refetch: clubInfoByClubNameRefetch } = useQuery({
        queryKey: ["clubInfoByClubName", studentInfo?.clubName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/clubInfoByClubName?clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    useEffect(() => {
        if (clubInfoByClubName[0]?.endDateNum) {
            setEditDate(new Date(clubInfoByClubName[0].endDateNum));
        }
    }, [clubInfoByClubName]);

    const clubRegEditEndDate = editDate ? editDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    const clubRegEditEndDateNum = editDate ? editDate.toLocaleDateString() : '';
    // console.log(clubInfoByClubName)
    const stdDeleteHandler = (id) => {
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
                fetch(`http://localhost:5000/club_reg_std_delete?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {

                            clubRegStdInfoRefetch()
                            clubRegStdLenRefetch()
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
    const onCloseClubModal = () => {
        setOpenClubModal(false)

    }
    const onCloseClubEditModal = () => {
        setOpenClubEditModal(false)

    }
    // console.log(studentInfo)
    const handleDetailsClick = (detailsData) => {
        setDetails(detailsData);
        document.getElementById('details_modal_1').showModal();

    };
    const textIdHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value.trim();
        setSearchId(search)
    }
    const allClick = () => {
        setSearchId("")
        // setContentType("all")
    }
    const submitClubHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const image = form.clubImage.value.trim();
        const feeString = form.regFee.value.trim();
        const fee = parseInt(feeString, 10);
        const totalMembers = form.totalMembers.value.trim()
        const endDate = clubRegEndDate;
        const endDateNum = clubRegEndDateNum;
        const clubName = studentInfo?.clubName
        const clubData = {
            image, fee, totalMembers, endDate, endDateNum, clubName
        }
        // console.log(clubData)
        fetch(`http://localhost:5000/add_club_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(clubData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    clubInfoByClubNameRefetch()
                    setOpenClubModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("The club info is already exist ")
                }


            })
    }
    const clubInfoEditHandler = (id) => {
        setOpenClubEditModal(true)
        setClubId(id)
    }
    const submitClubEditHandler = (event) => {
        event.preventDefault();

        const form = event.target;
        const image = form.clubImage.value.trim();
        const feeString = form.regFee.value.trim();
        const fee = parseInt(feeString, 10);
        const totalMembers = form.totalMembers.value.trim()
        const endDate = clubRegEditEndDate;
        const endDateNum = clubRegEditEndDateNum;
        const clubName = studentInfo?.clubName
        const clubEditData = {
            image, fee, totalMembers, endDate, endDateNum, clubName
        }
        fetch('http://localhost:5000/editClubInfo', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(clubEditData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount === 1) {
                    // console.log(data)
                    setOpenClubEditModal(false)

                    clubInfoByClubNameRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }
    const clubDeleteHandler = (clubName) => {
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
                fetch(`http://localhost:5000/deleteClubInfo?clubName=${clubName}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            clubInfoByClubNameRefetch()
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
        <div className='bg-[#F2F2F2] pl-3 h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome {studentInfo?.stdName} as <span className='font-bold'>{studentInfo?.clubName}</span> Admin</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-center'>
                    <h1>Active Club Members: <span className='font-bold'>{clubRegStdLen?.length}</span></h1>
                </div>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                {
                    clubInfoByClubName.length ? <>
                        {/* <div className='flex justify-center pb-4'>
                        <div className='flex items-center'>
                            <h1 className='font-semibold'>Update/Delete Club Data for Membership Registration</h1>
                        </div>

                    </div> */}
                    </> : <><div className='flex justify-center pb-4'>
                        <div className='flex items-center pr-5'>
                            <h1 className='font-semibold'>Add Club Data for Membership Registration</h1>
                        </div>
                        <button onClick={() => setOpenClubModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Add Club</button>
                    </div></>
                }
                <div className='mb-5'>
                    {
                        clubInfoByClubName.length ? <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead className='bg-[#F2F2F2] text-black'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Club Name</th>
                                        <th>Registration End Date</th>
                                        <th>Registration Fee</th>

                                        <th>Total Members</th>

                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clubInfoByClubName.length && <tr className="hover">
                                            {/* <th className='bg-white'>1</th> */}
                                            <td>{clubInfoByClubName[0]?.clubName}</td>
                                            <td className=''>{clubInfoByClubName[0]?.endDate}</td>
                                            <td className=''>{clubInfoByClubName[0]?.fee}</td>
                                            <td className=''>{clubInfoByClubName[0]?.totalMembers}</td>


                                            <td><button onClick={() => clubInfoEditHandler(clubInfoByClubName[0]?._id)} className='rounded-full bg-blue-500 p-2'>
                                                <AiOutlineEdit className='text-white' />
                                            </button> </td>

                                            <td className=''>
                                                <button onClick={() => clubDeleteHandler(clubInfoByClubName[0]?.clubName)} className='rounded-full bg-red-500 p-2'>
                                                    <MdDelete className='text-white' />
                                                </button>
                                            </td>
                                        </tr>

                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {clubInfoByClubNameLoading ? <div className='text-center  text-blue-500 font-medium  my-10'><p >Data Loading...</p></div> :
                                <div className='text-center text-red-500 font-medium  my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
                <div className='flex justify-between pb-5'>
                    <button onClick={allClick} className={` font-semibold ${searchId === "" ? 'text-blue-500' : ''}`}>All</button>
                    <div className=''>
                        <form onSubmit={textIdHandler} action="" className='flex gap-2'>
                            <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By Id' />


                            <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                        </form>
                    </div>
                </div>
                <div>
                    <div className='mb-10'>
                        {
                            clubRegStdInfo.length > 0 ? <div className="overflow-x-auto">
                                <table className="table table-compact w-full">
                                    <thead className='bg-[#0A2647] text-white'>
                                        <tr>
                                            {/* <th></th> */}
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Session</th>
                                            <th>Phone</th>
                                            <th>Email</th>

                                            <th>Details</th>

                                            {/* <th>Edit</th> */}
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clubRegStdInfo && clubRegStdInfo.map((data, i) => <tr key={data._id} className="hover">
                                                {/* <th className='bg-white'>{i + 1}</th> */}
                                                <td>{data?.uid}</td>
                                                <td className=''>{data?.stdName}</td>
                                                <td className=''>{data?.stdDepartment}</td>
                                                <td>{data?.stdSession}</td>
                                                <td className=''>{data?.stdPhone}</td>
                                                <td className=''>
                                                    <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${data?.stdEmail}`} target="_blank">
                                                        <button className='rounded-full bg-blue-500 p-2'>
                                                            <MdOutlineEmail className='text-white' />
                                                        </button></Link>
                                                </td>
                                                <td><button onClick={() => handleDetailsClick(data)} className='rounded-full bg-green-500 p-2'>
                                                    <CgProfile className='text-white' />
                                                </button> </td>

                                                <td className=''>
                                                    <button onClick={() => stdDeleteHandler(data?._id)} className='rounded-full bg-red-500 p-2'>
                                                        <MdDelete className='text-white' />
                                                    </button>
                                                </td>
                                            </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div> : <div>
                                {clubRegStdInfoLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                    <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                                }
                            </div>
                        }

                    </div>
                </div>
            </div>
            {/* modal for student info details*/}
            {
                <dialog id="details_modal_1" className="modal">
                    <div className="modal-box w-6/12 max-w-5xl ">
                        <h3 className="font-bold text-lg">Name: {details?.stdName} </h3>
                        {/* <h3 className="font-bold text-lg">Name: {details?.stdImage} </h3> */}
                        <p className="py-1 text-justify"><span className='font-bold '>ID: </span> {details?.uid}</p>
                        <p className="py-1 text-justify"><span className='font-bold '>Department: </span>{details?.stdDepartment}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Session: </span>{details?.stdSession}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Email: </span>{details?.stdEmail}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Phone: </span>{details?.stdPhone}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Blood Group: </span>{details?.stdBlood}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Date Of Birth: </span>{details?.stdDob}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Registration Date: </span>{details?.registrationDate}  </p>
                        <p className="py-1 text-justify"><span className='font-bold '>Amount: </span>{details?.registerFee}  </p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }
            {
                openClubModal && <Modal open={openClubModal} onClose={onCloseClubModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitClubHandler} action="">

                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Image Link</span>

                                <input name='clubImage' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Registration Fee</span>

                                <input name='regFee' type="number" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required />
                            </label>
                            <div className='w-full flex flex-col'>
                                <label className="text-sm">Registration End Date</label>
                                <br />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1"
                                />

                            </div>
                            <label className=''>
                                <span className="text-sm">Total Active Members</span>

                                <input name='totalMembers' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={clubRegStdLen?.length} />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* edit handler */}
            {
                clubInfoByClubName && openClubEditModal && <Modal open={openClubEditModal} onClose={onCloseClubEditModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitClubEditHandler} action="">

                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Image Link</span>

                                <input name='clubImage' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required defaultValue={clubInfoByClubName[0]?.image} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Registration Fee</span>

                                <input name='regFee' type="number" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required defaultValue={clubInfoByClubName[0]?.fee} />
                            </label>
                            <div className='w-full flex flex-col'>
                                <label className="text-sm">Registration End Date</label>
                                <br />
                                <DatePicker
                                    selected={editDate}
                                    onChange={(date) => setEditDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1"
                                />

                            </div>
                            <label className=''>
                                <span className="text-sm">Total Active Members</span>

                                <input name='totalMembers' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={clubRegStdLen?.length} />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default AdminDashboard;
