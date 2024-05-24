import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Modal from 'react-responsive-modal';
import { AuthContext } from '../../ContextApi/UserContext';
import toast from 'react-hot-toast';
import GuidanceChild from './GuidanceChild';

const Guidence = () => {
    const { user } = useContext(AuthContext);
    const [openGuidanceModal, setOpenGuidanceModal] = useState(false);
    const [selectedGuidance, setSelectedGuidance] = useState("");
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const { data: regClubInfoByEmail = [], isLoading: regClubInfoByEmailLoading, refetch: regClubInfoByEmailRefetch } = useQuery({
        queryKey: ["clubRegisterInfoByGmail", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/clubRegisterInfoByGmail?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const { data: studentInfo = [], isLoading: eventsLoading, refetch: eventsRefetch } = useQuery({
        queryKey: ["studentInfo"],
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

    const clubNames = regClubInfoByEmail.map(data => data.clubName);
    // console.log(clubNames)
    const { data: guidanceInfoByEmail = [], isLoading: guidanceInfoByEmailLoading, refetch: guidanceInfoByEmailRefetch } = useQuery({
        queryKey: ["getGuidance", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/getGuidance?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const onCloseGuidanceModal = () => {
        setOpenGuidanceModal(false)

    }
    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const subject = form.subject.value;
        const type = form.type.value;
        const clubName = form.sendTo.value;
        const discription = form.description.value;
        const stdEmail = user?.email
        const stdSession = studentInfo?.stdSession
        const stdDepartment = studentInfo?.stdDepartment
        const reply = "no";
        const requestDateNum = new Date().toLocaleDateString();
        const requestDate = formattedDate;
        const data = {
            subject, type, discription, stdEmail, stdSession, stdDepartment, reply, requestDate, requestDateNum, clubName
        }
        // console.log(data)
        fetch(`http://localhost:5000/guidance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    guidanceInfoByEmailRefetch()
                    setOpenGuidanceModal(false)
                    toast.success('Successfully Submitted!')
                }
                else {
                    setOpenGuidanceModal(false)
                    toast.error("Something Error ")
                }


            })
    }
    const messageHandler = (guidanceData) => {
        setSelectedGuidance(guidanceData)
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full pr-3'>
            <div className='py-5 '>
                <h1>Welcome to Guidance</h1>
            </div>
            <div >
                <div className='flex justify-center pb-4'>
                    <div className='flex items-center pr-5'>
                        <h1 className='font-bold text-lg'>Need Career Guidance</h1>
                    </div>
                    <button onClick={() => setOpenGuidanceModal(true)} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Guidance</button>
                </div>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5'>
                {
                    guidanceInfoByEmail.length === 0 ? <>
                        {
                            guidanceInfoByEmailLoading ? <>
                                <div>
                                    <h1 className=''>Loading...</h1>
                                </div></> : <div>
                                <h1 className=''>No Content</h1>
                            </div>
                        }

                    </> : <>

                        {
                            guidanceInfoByEmail.map(data => <GuidanceChild
                                refetch={guidanceInfoByEmailRefetch}
                                key={data._id}
                                data={data}
                                messageHandler={messageHandler}
                            ></GuidanceChild>)
                        }</>
                }
            </div>
            {/* modal */}
            {
                openGuidanceModal && <Modal open={openGuidanceModal} onClose={onCloseGuidanceModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px] '>
                        <form onSubmit={submitHandler} action="">
                            <label className=''>
                                <span className="text-sm">Type</span>
                                <select name='type' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border  text-sm shadow-sm focus:outline-none  focus:ring-1 " required>

                                    <option value='Seminar Request'>Seminar Request</option>
                                    <option value='Career Guidance'>Career Guidance</option>
                                    <option value='Others'>Others</option>

                                </select>
                            </label>
                            <label className=''>
                                <span className="text-sm">Subject</span>

                                <input name='subject' type="tel" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none  focus:ring-1" required />
                            </label>
                            <label className=''>
                                <span className="text-sm">Send To</span>

                                <select name='sendTo' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border  text-sm shadow-sm focus:outline-none  focus:ring-1 " required>

                                    {clubNames.map((club, index) => (
                                        <option key={index} value={club}>{club}</option>
                                    ))}

                                </select>
                            </label>
                            <label>
                                <span className="text-sm">Description</span>
                                <textarea rows={3} name='description' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1" required />
                            </label>
                            <button className='border w-full p-2 bg-[#0A2647] text-white font-bold hover:bg-black hover:text-white hover:duration-500 rounded-lg' type="submit">Submit Request</button>

                        </form>
                    </div>
                </Modal>
            }
            {/*  */}
            {/* reply message */}
            {
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl ">
                        <h3 className="font-bold text-lg">Subject: {selectedGuidance?.subject}     </h3>
                        <p className="py-4 text-justify"><span className='font-bold '>Description: </span> {selectedGuidance?.discription}  </p>
                        <p className="py-4 text-justify"><span className='font-bold '>Message Reply: </span>{selectedGuidance?.reply}  </p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }

        </div>
    );
};

export default Guidence;