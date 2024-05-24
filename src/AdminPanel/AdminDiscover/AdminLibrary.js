import React, { useContext, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AdminLibrary = () => {
    const [searchText, setSearchText] = useState("");
    const { user } = useContext(AuthContext);
    const [openLibraryModal, setOpenLibraryModal] = useState(false);
    const [openEditLibModal, setOpenEditLibModal] = useState(false);
    const [libEditData, setLibEditData] = useState("")
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
    const { data: contentData = [], isLoading: contentDataLoading, refetch: contentDataRefetch } = useQuery({
        queryKey: ["contentDataByAdmin", studentInfo?.clubName, searchText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/contentDataByAdmin?clubName=${studentInfo?.clubName}&searchText=${searchText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // console.log(contentData)
    const onCloseLibModal = () => {
        setOpenLibraryModal(false)
        // setUpdateStatus("")

    }
    const onOpenEditLibModal = (libData) => {
        setOpenEditLibModal(true)
        setLibEditData(libData)

    }
    const onCloseEditLibModal = () => {
        setOpenEditLibModal(false)
    }
    const submitLibHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const libraryId = parseInt(form.libraryId.value.trim());
        const title = form.title.value
        const description = form.description?.value
        const videoLink = form.videoLink.value
        const exploreLink = form.exploreLink.value
        const popularContent = form.popularContent.value
        const clubName = studentInfo?.clubName
        const submitData = {
            libraryId, title, description, videoLink, exploreLink, popularContent, publishedDate, publishedDateNum, clubName
        }
        fetch(`http://localhost:5000/add_library_data`, {
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
                    contentDataRefetch()
                    setOpenLibraryModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Provide unique Library Id ")
                }


            })
    }
    const submitLibEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const libraryId = parseInt(form.libraryId.value.trim());
        const title = form.title.value
        const description = form.description?.value
        const videoLink = form.videoLink.value
        const exploreLink = form.exploreLink.value
        const popularContent = form.popularContent.value
        const clubName = studentInfo?.clubName
        const mongodbId = libEditData?._id
        const editData = {
            libraryId, title, description, videoLink, exploreLink, popularContent, clubName, mongodbId
        }
        fetch('http://localhost:5000/editLibraryData', {
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
                    setOpenEditLibModal(false)

                    contentDataRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenClubEditModal(false)
                    toast.error("Error")
                }
            })
    }
    const libDeleteHandler = (id) => {
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
                fetch(`http://localhost:5000/deleteLibraryInfo?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            // console.log(data)
                            contentDataRefetch()
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
                        <h1 className='font-semibold'>Add premium content from here</h1>
                    </div>
                    <button onClick={() => setOpenLibraryModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Add Library</button>
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
                    contentData.length > 0 ? <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead className='bg-[#0A2647] text-white'>
                                <tr>
                                    {/* <th></th> */}
                                    <th>Library id</th>
                                    <th>Title</th>
                                    <th>Video</th>

                                    <th >Explore</th>
                                    <th>Recommend</th>

                                    <th>Publish Date</th>

                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contentData && contentData.map((data, i) => <tr key={data._id} className="hover">
                                        {/* <th className='bg-white'>{i + 1}</th> */}
                                        <td>{data?.libraryId}</td>

                                        <td className=''>{data?.title.slice(0, 35)}...</td>
                                        {/* .slice(0, 35) */}
                                        <td  >
                                            <Link to={data?.videoLink} target="_blank">
                                                <button className='rounded-full bg-blue-500 p-2'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button></Link>
                                        </td>
                                        <td  >
                                            <Link to={data?.exploreLink} target="_blank">
                                                <button className='rounded-full bg-blue-500 p-2'>
                                                    <FaExternalLinkAlt className='text-white' />
                                                </button></Link>
                                        </td>



                                        <td className=''>
                                            <h1>{data?.popularContent}</h1>
                                        </td>
                                        <td className=''>{data?.publishedDate}</td>
                                        <td>
                                            <button onClick={() => onOpenEditLibModal(data)} className='rounded-full bg-green-500 p-2' >
                                                <AiOutlineEdit className='text-white' />
                                            </button>
                                        </td>

                                        <td className=''>
                                            <button onClick={() => libDeleteHandler(data?._id)} className='rounded-full bg-red-500 p-2'>
                                                <MdDelete className='text-white' />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div> : <div>
                        {contentDataLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                            <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                        }
                    </div>
                }

            </div>
            {/* insert handler */}
            {
                openLibraryModal && <Modal open={openLibraryModal} onClose={onCloseLibModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitLibHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Library Id</span>

                                <input name='libraryId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Title</span>

                                <input name='title' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Description</span>

                                <textarea rows={3} name='description' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" />
                            </label>
                            <label className=''>
                                <span className="text-sm">Youtube Video Link</span>

                                <input name='videoLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Explore Link </span>

                                <input name='exploreLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Recommend This</span>
                                <select name='popularContent' className="mt-1 rounded-md mb-12 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required >

                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                </select>
                            </label>


                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Library Data</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* edit handler */}
            {
                openEditLibModal && <Modal open={openEditLibModal} onClose={onCloseEditLibModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitLibEditHandler} action="">
                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Library Id</span>

                                <input name='libraryId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required disabled value={libEditData?.libraryId} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Title</span>

                                <input name='title' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={libEditData?.title} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Description</span>

                                <textarea rows={3} name='description' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={libEditData?.description} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Youtube Video Link</span>

                                <input name='videoLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={libEditData?.videoLink} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Explore Link </span>

                                <input name='exploreLink' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={libEditData?.exploreLink} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Recommend This</span>
                                <select name='popularContent' className="mt-1 rounded-md mb-12 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={libEditData?.popularContent} >

                                    <option value='yes'>yes</option>
                                    <option value='no'>no</option>

                                </select>
                            </label>


                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Edit</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default AdminLibrary;