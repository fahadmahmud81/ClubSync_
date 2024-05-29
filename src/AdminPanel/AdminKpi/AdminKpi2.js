import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';

const AdminKpi2 = () => {
    const [searchText, setSearchText] = useState("");
    const [searchRank, setSearchRank] = useState("");
    const [srcDate, setSrcDate] = useState("");
    const [openKpiModal, setOpenKpiModal] = useState(false);
    const [modalData, setModalData] = useState("")
    const [editData, setEditData] = useState("")
    const { user } = useContext(AuthContext);
    const [searchDate, setSearchDate] = useState(new Date());
    const [todayDate, setTodayDate] = useState(new Date());

    const assessDate = todayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const assessDateNum = todayDate.toLocaleDateString();


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
        setSearchRank("")
        // setContentType("all")
    }
    const rankHandler = (event) => {
        event.preventDefault()
        const form = event.target;
        const search = parseInt(form.search.value.trim());
        setSearchRank(search)
    }
    const dateHandler = (event) => {
        event.preventDefault()
        const form = event.target;
        const search = form.search.value;
        setSrcDate(search)
    }
    const { data: executiveData = [], isLoading: executiveDataLoading, refetch: executiveDataRefetch } = useQuery({
        queryKey: ["executiveDataKpiInsert", studentInfo?.clubName, searchText, searchRank,],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/executiveDataKpiInsert?clubName=${studentInfo?.clubName}&searchText=${searchText}&searchRank=${searchRank}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    const onCloseKpiModal = () => {
        setOpenKpiModal(false)
        // setUpdateStatus("")
        setModalData("")
        setEditData("")
    }
    const onOpenKpiModal = (data) => {
        setOpenKpiModal(true)
        setModalData(data)
        setEditData(data)
        // console.log(data?._id)
        memberKpiRefetch()

    }
    const { data: memberKpi = {}, isLoading: memberKpiLoading, refetch: memberKpiRefetch } = useQuery({
        queryKey: ["getAttendenceFieldScore", studentInfo?.clubName, editData?._id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/getAttendenceFieldScore?clubName=${studentInfo?.clubName}&id=${editData?._id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // console.log(memberKpi)
    const submitKpiHandler = (event) => {
        event.preventDefault()
        const form = event.target;
        const attendenceScore = parseInt(form.attendenceScore.value.trim());
        const fieldScore = parseInt(form.fieldScore.value.trim());
        const clubName = studentInfo?.clubName
        const memberMongodbId = modalData?._id

        const memberName = modalData?.memberName
        const memberUid = modalData?.memberUid
        const memberDepartment = modalData?.memberDepartment
        const memberSession = modalData?.memberSession
        const memberEmail = modalData?.memberEmail
        const memberPhone = modalData?.memberPhone
        const designation = modalData?.designation
        const memberRank = modalData?.memberRank
        const kpidata = {
            memberMongodbId, clubName, memberName, memberUid, memberDepartment, memberSession, memberEmail, memberPhone, designation, memberRank, attendenceScore, fieldScore, assessDate, assessDateNum
        }
        fetch(`http://localhost:5000/add_executive_member_kpi_result`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(kpidata)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    executiveDataRefetch()
                    setOpenKpiModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    // setOpenClubModal(false)
                    toast.error("Error")
                }


            })
    }
    return (
        <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
            <div className='flex justify-between pb-5'>
                <button onClick={allClick} className={` font-semibold ${searchText === "" ? 'text-blue-500' : ''}`}>All</button>
                <div className=''>
                    <form onSubmit={rankHandler} action="" className='flex gap-2'>
                        <input name='search' type="number" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search by Rank (>)' />


                        <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                    </form>
                </div>
                {/*  <div className=''>
                    <form onSubmit={dateHandler} action="" className='flex gap-2'>

                        <div className="w-full flex flex-col">
                            <DatePicker
                                selected={searchDate}
                                onChange={(date) => setSearchDate(date)}
                                dateFormat="MMMM d, yyyy"
                                className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644]  focus:ring-[#0A4644]" placeholder='Search by Date'
                            />
                        </div>

                        <button className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>

                    </form>
                </div> */}
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
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    executiveData && executiveData.map((data, i) => <tr key={data._id} className="hover">
                                        <th className=''>{data?.memberRank}</th>


                                        <td className=''>{data?.memberName}</td>
                                        <td className=''>{data?.designation}</td>
                                        <td className=''>{data?.memberUid}</td>

                                        {/* .slice(0, 35) */}

                                        <td>
                                            <button onClick={() => onOpenKpiModal(data)} className='rounded-full bg-[#008CBA] p-2' >
                                                <AiOutlineEdit className='text-white' />
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
            {/* open modal */}
            {
                openKpiModal && <Modal open={openKpiModal} onClose={onCloseKpiModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] font-[poppins]'>
                        <form onSubmit={submitKpiHandler} action="">

                            <label className=''>
                                <span className="text-sm font-semibold">Name</span>

                                <input name='memberName' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={modalData?.memberName} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">University Id</span>

                                <input name='memberUid' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required disabled value={modalData?.memberUid} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-semibold">Designation</span>

                                <input name='designation' type="text" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required disabled value={modalData?.designation} />
                            </label>

                            <label className=''>
                                <span className="text-sm font-semibold">Attendence Score (out of 10)</span>

                                <input name='attendenceScore' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={memberKpi?.attendenceScore} />
                            </label>

                            <label className=''>
                                <span className="text-sm font-semibold">Field Score (out of 10)</span>

                                <input name='fieldScore' type="number" className="mt-1 rounded-md mb-3 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={memberKpi?.fieldScore} />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Data</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default AdminKpi2;