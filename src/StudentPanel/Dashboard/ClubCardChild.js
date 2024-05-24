import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import Modal from 'react-responsive-modal';
import { AuthContext } from '../../ContextApi/UserContext';
import toast from 'react-hot-toast';

const ClubCardChild = ({ data, registerClubInfoRefetch }) => {
    const { user } = useContext(AuthContext)
    // console.log(user?.email)
    const { _id, clubName, endDate, totalMembers, endDateNum, fee, image, } = data
    const [openRegisterModal, setOpenRegisterModal] = useState(false)
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

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
    // console.log(studentInfo)

    const DateExpired = () => <>
        <div className='text-sm'>Time is Expired</div>
        <div className='pt-4 flex justify-end'>
            <button className="border text-sm px-4 rounded-lg py-1 opacity-40 cursor-not-allowed" type="submit" disabled>Register</button>
        </div>
    </>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // If the countdown is completed
            return <DateExpired />;
        } else {
            return <>🕒 <span className='text-sm font-semibold' >{days}d {hours}h {minutes}min {seconds}s</span>
                <div className='pt-4 flex justify-end'>
                    <button onClick={() => setOpenRegisterModal(true)} className="border border-[] px-2 rounded-lg py-1 text-sm hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Register</button>
                </div>
            </>;
        }
    };

    const onCloseRegisterModal = () => {
        setOpenRegisterModal(false)

    }
    const registerFormHandler = (event) => {
        event.preventDefault()

        const clubMongoDbId = _id;
        const uid = studentInfo?.uid;
        const stdEmail = studentInfo?.stdEmail;
        const stdName = studentInfo?.stdName;
        const stdPhone = studentInfo?.stdPhone;
        const stdSession = studentInfo?.stdSession;
        const stdDepartment = studentInfo?.stdDepartment;
        const stdGender = studentInfo?.stdGender;
        const stdBlood = studentInfo?.stdBlood;
        const stdDob = studentInfo?.stdDob;
        const stdImage = studentInfo?.stdImageUrl;
        const registerClubName = clubName;
        const registerFee = fee;
        const registrationDateNum = new Date().toLocaleDateString();
        const registrationDate = formattedDate;
        const clubImage = image;
        const stdClubRegisterInfo = {
            clubName, uid, stdEmail, stdName, stdPhone, stdSession, stdGender, stdBlood, stdDob, stdImage, registerClubName, registerFee, registrationDateNum, registrationDate, clubMongoDbId, clubImage, stdDepartment
        }
        fetch(`http://localhost:5000/std_club_registration_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(stdClubRegisterInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    setOpenRegisterModal(false)
                    registerClubInfoRefetch()
                    return toast.success('Successfully Registered!')
                }
                if (data?.message) {
                    setOpenRegisterModal(false)
                    return toast.error(data?.message)
                }
                if (data?.url) {
                    return window.location.replace(data.url);
                }

            })
    }


    return (
        <div className='bg-white rounded-2xl px-4 py-4 border'>
            <div className=''>
                <div className=''>
                    <img className=' h-[120px]  rounded-xl ' src={image} alt="" />
                </div>
                <div>
                    <h1 className='font-semibold  text-[15px] pt-1'>{clubName}</h1>
                    <h1 className='text-sm pt-1 text-[#B4B6BF]'>{totalMembers ? <>{totalMembers}</> : <>200</>} Members</h1>

                    <div className='pt-2'>
                        <Countdown date={endDateNum} renderer={renderer} />
                    </div>
                </div>
            </div>
            {/* register handler */}
            {
                openRegisterModal && <Modal open={openRegisterModal} onClose={onCloseRegisterModal} center classNames={{ modal: 'rounded-xl' }}>
                    <div className='mt-10 lg:w-[600px]'>
                        <form onSubmit={registerFormHandler}>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">University Id</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required value={studentInfo?.uid} disabled />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Email Address</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required value={studentInfo?.stdEmail} disabled />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Certificate Name</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required value={studentInfo?.stdName} disabled />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Phone Number</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required disabled value={studentInfo?.stdPhone} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Session</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required disabled value={studentInfo?.stdSession} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Gender</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required disabled value={studentInfo?.stdGender} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Blood Group</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required disabled value={studentInfo?.stdBlood} />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700 ">Date Of Birth</span>

                                <input name="date" type="" className="mt-1 mb-2 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required disabled value={studentInfo?.stdDob} />
                            </label>
                            <div className='my-7'>
                                <button type="submit"
                                    className='border w-full p-2 bg-blue-500 text-white font-bold hover:bg-black hover:text-white hover:duration-300'>{fee === 0 ? <span>Free Registration</span> : <span>Pay {fee} Tk</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default ClubCardChild;