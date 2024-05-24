import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const AdminRewards = () => {
    const [searchText, setSearchText] = useState("");
    const { user } = useContext(AuthContext);
    const [openRewardsModal, setOpenRewardsModal] = useState(false);
    const [openEditRwdModal, setOpenEditRwdModal] = useState(false);
    const [rwdEditData, setRwdEditData] = useState("")
    const startDate = new Date();
    const publishedDate = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    // console.log(clubRegEndDate, startDate)
    const publishedDateNum = startDate.toLocaleDateString();
    const allClick = () => {
        setSearchText("")
        // setContentType("all")
    }
    const textHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value.trim();
        setSearchText(search)
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
    const { data: rewardsData = [], isLoading: rewardsDataLoading, refetch: rewardsDataRefetch } = useQuery({
        queryKey: ["rewardsDataByAdmin", studentInfo?.clubName, searchText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/rewardsDataByAdmin?clubName=${studentInfo?.clubName}&searchText=${searchText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // console.log(rewardsData)
    const onCloseRwdModal = () => {
        setOpenRewardsModal(false)
        // setUpdateStatus("")

    }
    const onOpenEditRwdModal = (rwdData) => {
        setOpenEditRwdModal(true)
        setRwdEditData(rwdData)

    }
    const onCloseEditRwdModal = () => {
        setOpenEditRwdModal(false)
    }
    const submitRwdHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const rewardId = parseInt(form.rewardId.value.trim());
        const courseName = form.courseName.value
        const courseLink = form.courseLink.value
        const companyName = form.companyName.value
        const contact = form.contact.value
        const promoCode = form.promoCode.value
        const recommend = form.recommend.value
        const courseImg = form.courseImg.value
        const courseFee = parseInt(form.courseFee.value.trim())
        const discountCourseFee = parseInt(form.discountCourseFee.value.trim())
        const clubName = studentInfo?.clubName
        const submitData = {
            clubName, rewardId, courseName, courseLink, companyName, contact, promoCode, recommend, courseImg, courseFee, discountCourseFee, publishedDate, publishedDateNum
        }
        fetch(`http://localhost:5000/add_rewards_data`, {
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
                    rewardsDataRefetch()
                    setOpenRewardsModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Provide unique  Id ")
                }


            })
    }
    const submitRwdEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const rewardId = parseInt(form.rewardId.value.trim());
        const courseName = form.courseName.value
        const courseLink = form.courseLink.value
        const companyName = form.companyName.value
        const contact = form.contact.value
        const promoCode = form.promoCode.value
        const recommend = form.recommend.value
        const courseImg = form.courseImg.value
        const courseFee = parseInt(form.courseFee.value.trim())
        const discountCourseFee = parseInt(form.discountCourseFee.value.trim())
        const clubName = studentInfo?.clubName
        const mongodbId = rwdEditData?._id
        const editData = {
            clubName, rewardId, courseName, courseLink, companyName, contact, promoCode, recommend, courseImg, courseFee, discountCourseFee, mongodbId
        }
        fetch('http://localhost:5000/editRewardData', {
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
                    setOpenEditRwdModal(false)

                    rewardsDataRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }
    const rwdDeleteHandler = (id) => {
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
                fetch(`http://localhost:5000/deleteRewardInfo?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            rewardsDataRefetch()
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
                        <h1 className='font-semibold'>Add rewards from here</h1>
                    </div>
                    <button onClick={() => setOpenRewardsModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Add Rewards</button>
                </div>
                <div className=''>
                    <form onSubmit={textHandler} action="" className='flex gap-2'>
                        <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search By Title' />


                        <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                    </form>
                </div>
            </div>
            <div className='mb-10'>
                {
                    rewardsData.length > 0 ? <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead className='bg-[#0A2647] text-white'>
                                <tr>
                                    {/* <th></th> */}
                                    <th>id</th>
                                    <th>Course Name</th>
                                    <th>Fee</th>

                                    <th>Company</th>
                                    <th>Recom.</th>

                                    <th>Course Link</th>

                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rewardsData && rewardsData.map((data, i) => <tr key={data._id} className="hover">
                                        {/* <th className='bg-white'>{i + 1}</th> */}
                                        <td>{data?.rewardId}</td>

                                        <td className=''>{data?.courseName}</td>
                                        {/* .slice(0, 35) */}
                                        <td className=''>
                                            <h1>{data?.discountCourseFee} <strike className="text-sm text-[#B4B6BF]">{data?.courseFee}</strike></h1>
                                        </td>
                                        <td className=''>
                                            <h1>{data?.companyName}</h1>
                                        </td>
                                        <td className=''>
                                            <h1>{data?.recommend}</h1>
                                        </td>
                                        <td  >
                                            <Link to={data?.courseLink} target="_blank">
                                                <button className='rounded-full bg-blue-500 p-2'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => onOpenEditRwdModal(data)} className='rounded-full bg-green-500 p-2' >
                                                <AiOutlineEdit className='text-white' />
                                            </button>
                                        </td>

                                        <td className=''>
                                            <button onClick={() => rwdDeleteHandler(data?._id)} className='rounded-full bg-red-500 p-2'>
                                                <MdDelete className='text-white' />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div> : <div>
                        {rewardsDataLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                            <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                        }
                    </div>
                }

            </div>
            {/* insert handler */}
            {
                openRewardsModal && <Modal open={openRewardsModal} onClose={onCloseRwdModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitRwdHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Reward Id</span>

                                <input name='rewardId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Name</span>

                                <input name='courseName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Link</span>

                                <input name='courseLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Company Name</span>

                                <input name='companyName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Contact Phone No.</span>

                                <input name='contact' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Promo Code</span>

                                <input name='promoCode' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" />
                            </label>
                            <label className=''>
                                <span className="text-sm">Recommend This</span>
                                <select name='recommend' className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required >

                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                </select>
                            </label>

                            <label className=''>
                                <span className="text-sm">Course Image Link</span>

                                <input name='courseImg' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Fee (Without Discount)</span>

                                <input name='courseFee' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Fee (After Discount)</span>

                                <input name='discountCourseFee' type="number" className="mt-1 rounded-md mb-12 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit  Data</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* edit handler */}
            {
                openEditRwdModal && <Modal open={openEditRwdModal} onClose={onCloseEditRwdModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitRwdEditHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Reward Id</span>

                                <input name='rewardId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required disabled defaultValue={rwdEditData?.rewardId} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Name</span>

                                <input name='courseName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.courseName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Link</span>

                                <input name='courseLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.courseLink} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Company Name</span>

                                <input name='companyName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.companyName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Contact Phone No.</span>

                                <input name='contact' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.contact} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Promo Code</span>

                                <input name='promoCode' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={rwdEditData?.promoCode} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Recommend This</span>
                                <select name='recommend' className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.recommend} >

                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                </select>
                            </label>

                            <label className=''>
                                <span className="text-sm">Course Image Link</span>

                                <input name='courseImg' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.courseImg} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Fee (Without Discount)</span>

                                <input name='courseFee' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.courseFee} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Course Fee (After Discount)</span>

                                <input name='discountCourseFee' type="number" className="mt-1 rounded-md mb-12 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={rwdEditData?.discountCourseFee} />
                            </label>
                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Edit Data</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default AdminRewards;