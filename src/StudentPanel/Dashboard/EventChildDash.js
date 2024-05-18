import React, { useContext, useState } from 'react';
import demologo from '../../Assets/demo.png'
import Modal from 'react-responsive-modal';
import Countdown from 'react-countdown';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../ContextApi/UserContext';
import toast from 'react-hot-toast';

const EventChildDash = ({ data }) => {
    const { user } = useContext(AuthContext)
    const { _id, headline, sortHeadline, venue, clubName, clubLogo, regEndDateNum, eventDetails, regEndDate, eventDate, eventTime, companyLogo, companyName, presidentSign, gsSign, presidentName, gsName } = data
    const [openEventRegisterModal, setOpenEventRegisterModal] = useState(false);
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const { data: studentInfo = [], isLoading: eventsLoading, refetch: eventsRefetch } = useQuery({
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

    const onCloseEventRegModal = () => {
        setOpenEventRegisterModal(false)

    }
    const DateExpired = () => <>
        <span className=''>Time is Expired</span>
        <div className='pt-4 flex justify-end'>
            <button className="border  px-5 rounded-lg py-1 opacity-40 cursor-not-allowed" type="submit" disabled>Register</button>
        </div>
    </>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // If the countdown is completed
            return <DateExpired />;
        } else {
            return <><span className='text-sm font-semibold' >{days}d {hours}h {minutes}min {seconds}s</span>
                <div className='pt-4 flex justify-end'>
                    <button onClick={eventRegisterHandler} className="border border-[#111e8d] text-[#111e8d] px-5 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit"  >Register</button>
                </div>
            </>;
        }
    };
    const eventRegisterHandler = () => {
        const uid = studentInfo?.uid;
        const stdEmail = studentInfo?.stdEmail;
        const stdName = studentInfo?.stdName;
        const stdPhone = studentInfo?.stdPhone;
        const stdSession = studentInfo?.stdSession;
        const stdGender = studentInfo?.stdGender;
        const stdBlood = studentInfo?.stdBlood;
        const stdDob = studentInfo?.stdDob;
        const stdImage = studentInfo?.stdImage;
        const eventClubName = clubName;
        const eventId = _id;
        const eventRegistrationDateNum = new Date().toLocaleDateString();
        const eventRegistrationDate = formattedDate;
        const eventHeadline = headline;
        const eventRegEndDate = regEndDate;
        const status = "pending";
        const stdEventRegisterInfo = {
            uid, stdEmail, stdName, stdPhone, stdSession, stdGender, stdBlood, stdDob, stdImage, eventClubName, eventId, eventRegistrationDateNum, eventRegistrationDate, eventHeadline, eventRegEndDate, status, clubLogo, companyLogo, companyName, presidentSign, gsSign, presidentName, gsName, sortHeadline, eventDate
        }
        fetch(`http://localhost:5000/std_event_registration_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(stdEventRegisterInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.acknowledged) {
                    setOpenEventRegisterModal(false)
                    toast.success('Successfully Registered!')
                }
                else {
                    setOpenEventRegisterModal(false)
                    toast.error("You are already registered. Don't worry. ")
                }


            })
    }
    return (
        <div>
            <div onClick={() => setOpenEventRegisterModal(true)} className='mb-5 flex justify-between bg-white items-center p-3 rounded-lg border hover:cursor-pointer'>
                <div className='flex'>
                    <div className="avatar">
                        <div className="w-11 rounded-full">
                            <img src={demologo} alt="" />
                        </div>

                    </div>
                    <div className='flex items-center justify-center pl-3'>
                        <div>
                            <h1 className=' font-semibold text-sm'>{sortHeadline}</h1>
                            <h1 className='text-sm text-[#B4B6BF]'>{clubName}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    ...
                </div>
            </div>
            {/* Modal */}
            {
                openEventRegisterModal && <Modal open={openEventRegisterModal} onClose={onCloseEventRegModal} center>
                    <div className='mt-10 lg:w-[600px] '>
                        <h1><span className='font-bold'>Club Name:</span>  {clubName}</h1>
                        <h1 className='pt-2'>Title: {headline}</h1>
                        <h1 className='py-2'>Description: {eventDetails}</h1>
                        <h1>Event Date: {eventDate} at {eventTime}</h1>
                        <h1>Venue: {venue}</h1>


                        <h1 className='pt-2'>Time Remaining: <Countdown date={regEndDateNum} renderer={renderer} /> </h1>
                        {/* <div className='pt-5'>
                            <button onClick={eventRegisterHandler} className="border border-[#111e8d] text-[#111e8d] px-5 rounded-lg py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Register</button>
                        </div> */}
                    </div>
                </Modal>
            }
        </div>
    );
};

export default EventChildDash;