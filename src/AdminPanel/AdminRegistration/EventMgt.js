import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import Modal from 'react-responsive-modal';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const EventMgt = () => {
    const { user } = useContext(AuthContext);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [certificate, setCertificate] = useState("yes")
    const [openEventEditModal, setOpenEventEditModal] = useState(false);
    const [editData, setEditData] = useState("")
    const [eDate, setEDate] = useState(new Date());
    const [editEDate, setEditEDate] = useState(null);
    const [editEDeadline, setEditEDeadline] = useState(null);

    // console.log(getTime(dateTime))
    const eventDate = eDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const eventDateNum = eDate.toLocaleDateString();
    const [eventDeadline, setEventDeadline] = useState(new Date());
    const regEndDate = eventDeadline.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const regEndDateNum = eventDeadline.toLocaleDateString();

    const dateTime = new Date();
    const getTime = (date) => {
        return date.toLocaleTimeString();
    };
    const eventApplyDate = dateTime.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const eventApplyDateNum = dateTime.toLocaleDateString();
    // 
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
    const { data: eventInfoByClub = [], isLoading: eventInfoByClubLoading, refetch: eventInfoByClubRefetch } = useQuery({
        queryKey: ["eventInfoByClub", studentInfo?.clubName,],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/eventInfoByClub?clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventInfoByClub)
    const onOpenEventModal = () => {
        setOpenEventModal(true)
        setCertificate("yes")
    }
    const onCloseEventModal = () => {
        setOpenEventModal(false)
        setCertificate("yes")

    }
    const submitEventHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const headline = form.headline.value.trim();
        const sortHeadline = form.sortHeadline.value.trim();
        const eventDetails = form.eventDetails.value.trim();
        const eventBanner = form.eventBanner.value.trim();
        const clubLogo = form.clubLogo.value.trim();
        const eventTime = form.eventTime.value.trim();
        const companyName = form.companyName.value.trim();
        const isCertificate = form.isCertificate.value.trim();
        const certificateType = form.certificateType?.value.trim(); // Check if certificateType exists
        const companyLogo = form.companyLogo?.value.trim(); // Check if companyLogo exists
        const presidentName = form.presidentName?.value.trim(); // Check if presidentName exists
        const presidentSign = form.presidentSign?.value.trim(); // Check if presidentSign exists
        const gsName = form.gsName?.value.trim(); // Check if gsName exists
        const gsSign = form.gsSign?.value.trim(); // Check if gsSign exists
        const venue = form.venue.value.trim();
        const eventId = parseInt(form.eventId.value.trim());
        const advisorApproval = "pending";
        const clubName = studentInfo?.clubName;
        const eventApplyTime = getTime(dateTime);
        const eventData = {
            eventId, headline, sortHeadline, eventDetails, eventBanner, clubLogo, eventTime, companyName, isCertificate, certificateType, companyLogo, presidentName, presidentSign, gsName, gsSign, advisorApproval, eventDate, eventDateNum, regEndDate, regEndDateNum, clubName, eventApplyTime, eventApplyDate, eventApplyDateNum, venue
        };

        // Check if isCertificate is 'no', if yes, set related fields to empty strings
        if (isCertificate === "no") {
            eventData.certificateType = "";
            eventData.companyLogo = "";
            eventData.presidentName = "";
            eventData.presidentSign = "";
            eventData.gsName = "";
            eventData.gsSign = "";
        }

        // console.log(clubData)
        fetch(`http://localhost:5000/add_event_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(eventData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    // guidanceInfoByEmailRefetch()
                    eventInfoByClubRefetch()
                    setOpenEventModal(false)
                    toast.success('Successfully Insert!')
                }
                else {
                    // setOpenEventModal(false)
                    toast.error("Please Provide Unique Event Id ")
                }


            })
    }
    const isCertificateBlurHandler = (event) => {
        event.preventDefault();
        const certificate = event.target.value;
        setCertificate(certificate)
    }
    // event Delete Handler 
    const eventDeleteHandler = (clubName, eventId) => {
        console.log(clubName, eventId)
        Swal.fire({
            title: "Are you sure? ",
            text: "Your event info and also registered student for this event will be deleted. You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deleteEventInfo?clubName=${clubName}&eventId=${eventId}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data?.result2?.deletedCount) {

                            eventInfoByClubRefetch()
                            Swal.fire({
                                title: "Deleted !",
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
    const eventInfoEditHandler = (eData) => {
        setOpenEventEditModal(true)
        setEditData(eData)
    }
    const onCloseEventEditModal = () => {
        setOpenEventEditModal(false)
        setEditData("")

    }

    // for edit event date
    useEffect(() => {
        if (editData?.eventDateNum) {
            setEditEDate(new Date(editData?.eventDateNum));
        }
    }, [editData]);

    const editEventDate = editEDate ? editEDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    const editEventDateNum = editEDate ? editEDate.toLocaleDateString() : '';
    // for edit reg end date
    useEffect(() => {
        if (editData?.regEndDateNum) {
            setEditEDeadline(new Date(editData?.regEndDateNum));
        }
    }, [editData]);

    const editEventDateline = editEDeadline ? editEDeadline.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    const editEventDatelineNum = editEDeadline ? editEDeadline.toLocaleDateString() : '';
    // console.log(editEventDateNum, editEventDatelineNum)
    // edit
    const submitEventEditHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const headline = form.headline.value.trim();
        const sortHeadline = form.sortHeadline.value.trim();
        const eventDetails = form.eventDetails.value.trim();
        const eventBanner = form.eventBanner.value.trim();
        const clubLogo = form.clubLogo.value.trim();
        const eventTime = form.eventTime.value.trim();
        const companyName = form.companyName.value.trim();
        const isCertificate = form.isCertificate.value.trim();
        const certificateType = form.certificateType?.value.trim(); // Check if certificateType exists
        const companyLogo = form.companyLogo?.value.trim(); // Check if companyLogo exists
        const presidentName = form.presidentName?.value.trim(); // Check if presidentName exists
        const presidentSign = form.presidentSign?.value.trim(); // Check if presidentSign exists
        const gsName = form.gsName?.value.trim(); // Check if gsName exists
        const gsSign = form.gsSign?.value.trim(); // Check if gsSign exists
        const venue = form.venue.value.trim();
        const eventId = parseInt(form.eventId.value.trim());
        // const advisorApproval = "pending";
        const clubName = studentInfo?.clubName;
        // const eventApplyTime = getTime(dateTime);
        const mongodbId = editData?._id
        const eventEditData = {
            eventId, headline, sortHeadline, eventDetails, eventBanner, clubLogo, eventTime, companyName, isCertificate, certificateType, companyLogo, presidentName, presidentSign, gsName, gsSign, editEventDate, editEventDateNum, editEventDateline, editEventDatelineNum, venue, clubName, mongodbId
        };
        fetch('http://localhost:5000/editEventInfo', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(eventEditData),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.modifiedCount === 1) {
                    // console.log(data)
                    setOpenEventEditModal(false)

                    eventInfoByClubRefetch()
                    toast.success("Edit successfully")
                }
                if (data.modifiedCount !== 1) {
                    // setOpenEventEditModal(false)
                    toast.error("Error")
                }
            })
    }

    return (
        <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-3'>
            <div className='flex justify-center pb-4'>
                <div className='flex items-center pr-5'>
                    <h1 className='font-semibold'>Create New Event:</h1>
                </div>
                <button onClick={onOpenEventModal} className="border border-[#0A2647] text-[#0A2647]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Create Event</button>
            </div>
            <div>
                <div className='mb-10'>
                    {
                        eventInfoByClub.length > 0 ? <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead className='bg-[#0A2647] text-white'>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Event id</th>
                                        <th>Short Headline</th>
                                        <th>Event Date</th>
                                        <th>Reg. End Date</th>
                                        <th >Approve Status</th>

                                        <th>Edit</th>

                                        {/* <th>Edit</th> */}
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        eventInfoByClub && eventInfoByClub.map((data, i) => <tr key={data._id} className="hover">
                                            {/* <th className='bg-white'>{i + 1}</th> */}
                                            <td>{data?.eventId}</td>

                                            <td className=''>{data?.sortHeadline}</td>
                                            <td>{data?.eventDate}</td>
                                            <td className=''>{data?.regEndDate}</td>
                                            <td className=''>{data?.advisorApproval}</td>

                                            <td><button className='rounded-full bg-green-500 p-2' onClick={() => eventInfoEditHandler(data)} >
                                                <AiOutlineEdit className='text-white' />
                                            </button> </td>

                                            <td className=''>
                                                <button onClick={() => eventDeleteHandler(data?.clubName, data?.eventId)} className='rounded-full bg-red-500 p-2'>
                                                    <MdDelete className='text-white' />
                                                </button>
                                            </td>
                                        </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div> : <div>
                            {eventInfoByClubLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                                <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                            }
                        </div>
                    }

                </div>
            </div>
            {
                openEventModal && <Modal open={openEventModal} onClose={onCloseEventModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitEventHandler} action="">

                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Id</span>

                                <input name='eventId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Headline </span>

                                <input name='headline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Preparing your chartered application: Your interview' />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Short Headline (For Certificate)</span>

                                <input name='sortHeadline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Ex: web-development workshop' />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Details</span>

                                <textarea rows={3} name='eventDetails' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Venue</span>

                                <input name='venue' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Banner Image</span>

                                <input name='eventBanner' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Logo Link</span>

                                <input name='clubLogo' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.clubLogo} />
                            </label>
                            <div className="w-full flex flex-col">
                                <label className="text-sm mb-1">Event Date</label>
                                <DatePicker
                                    selected={eDate}
                                    onChange={(date) => setEDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="w-full mt-1 rounded-md mb-2 px-3 py-2 bg-white border text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:ring-1"
                                />
                            </div>

                            <div className="w-full flex flex-col">
                                <label className="text-sm mb-1">Event Registration Deadline</label>
                                <DatePicker
                                    selected={eventDeadline}
                                    onChange={(date) => setEventDeadline(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="w-full mt-1 rounded-md mb-2 px-3 py-2 bg-white border text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:ring-1"
                                />
                            </div>

                            <label className=''>
                                <span className="text-sm">Event Time</span>

                                <input name='eventTime' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Ex: 2.00 PM' />
                            </label>

                            <label className=''>
                                <span className="text-sm">Company Name</span>

                                <input name='companyName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                            </label>

                            <label className=''>
                                <span className="text-sm">Award Certificates</span>
                                <select onChange={isCertificateBlurHandler} name='isCertificate' className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required>

                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                </select>
                            </label>

                            {
                                certificate === "yes" ? <>
                                    <label className='flex justify-center font-medium my-3'> Fill Up this For Genarate Certificate</label>
                                    <label className=''>
                                        <span className="text-sm">Certificate's Type</span>

                                        <input name='certificateType' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Participation or Appreciation or Achievement etc' />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Company Logo Link</span>

                                        <input name='companyLogo' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Club President Name</span>

                                        <input name='presidentName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.presidentName} />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Club President Sign Link</span>

                                        <input name='presidentSign' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.presidentSign} />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Club GS Name</span>

                                        <input name='gsName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.gsName} />
                                    </label>
                                    <label className=''>
                                        <span className="text-sm">Club GS Sign Image Link</span>

                                        <input name='gsSign' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={studentInfo?.gsSign} />
                                    </label></> : <></>
                            }
                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit</button>

                        </form>
                    </div>
                </Modal>
            }
            {/* edit modal */}
            {
                openEventEditModal && <Modal open={openEventEditModal} onClose={onCloseEventEditModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitEventEditHandler} action="">

                            <label className=''>
                                <span className="text-sm">Club Name</span>

                                <input name='clubName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" disabled value={studentInfo?.clubName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Id</span>

                                <input name='eventId' type="number" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required disabled value={editData?.eventId} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Headline </span>

                                <input name='headline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Preparing your chartered application: Your interview' defaultValue={editData?.headline} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Short Headline (For Certificate)</span>

                                <input name='sortHeadline' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Ex: web-development workshop' defaultValue={editData?.sortHeadline} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Details</span>

                                <textarea rows={3} name='eventDetails' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.eventDetails} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Venue</span>

                                <input name='venue' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.venue} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Event Banner Image</span>

                                <input name='eventBanner' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.eventBanner} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club Logo Link</span>

                                <input name='clubLogo' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.clubLogo} />
                            </label>
                            <div className="w-full flex flex-col">
                                <label className="text-sm mb-1">Event Date</label>
                                <DatePicker
                                    selected={editEDate}
                                    onChange={(date) => setEditEDate(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="w-full mt-1 rounded-md mb-2 px-3 py-2 bg-white border text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:ring-1"
                                />
                            </div>

                            <div className="w-full flex flex-col">
                                <label className="text-sm mb-1">Event Registration Deadline</label>
                                <DatePicker
                                    selected={editEDeadline}
                                    onChange={(date) => setEditEDeadline(date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="w-full mt-1 rounded-md mb-2 px-3 py-2 bg-white border text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:ring-1"
                                />
                            </div>

                            <label className=''>
                                <span className="text-sm">Event Time</span>

                                <input name='eventTime' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required placeholder='Ex: 2.00 PM' defaultValue={editData?.eventTime} />
                            </label>

                            <label className=''>
                                <span className="text-sm">Company Name</span>

                                <input name='companyName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.companyName} />
                            </label>

                            <label className=''>
                                <span className="text-sm">Award Certificates</span>
                                <select name='isCertificate' className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" required defaultValue={editData?.isCertificate}>

                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>

                                </select>
                            </label>


                            <label className='flex justify-center font-medium my-3'> Fill Up this For Genarate Certificate</label>
                            <label className=''>
                                <span className="text-sm">Certificate's Type</span>

                                <input name='certificateType' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" placeholder='Participation or Appreciation or Achievement etc' defaultValue={editData?.certificateType} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Company Logo Link</span>

                                <input name='companyLogo' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={editData?.companyLogo} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club President Name</span>

                                <input name='presidentName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={editData?.presidentName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club President Sign Link</span>

                                <input name='presidentSign' type="url" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={editData?.presidentSign} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club GS Name</span>

                                <input name='gsName' type="text" className="mt-1 rounded-md mb-2 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={editData?.gsName} />
                            </label>
                            <label className=''>
                                <span className="text-sm">Club GS Sign Image Link</span>

                                <input name='gsSign' type="url" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-300 focus:outline-none  focus:ring-1" defaultValue={editData?.gsSign} />
                            </label>

                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit</button>

                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default EventMgt;