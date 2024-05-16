import React, { useContext, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import ClubCardChild from './ClubCardChild';
import './Dashboard.css'
import { AuthContext } from '../../ContextApi/UserContext';
import YourClubChild from './YourClubChild';
import EventsChild from '../../Pages/NewsEvents/EventsChild';
import EventChildDash from './EventChildDash';

const Dashboard = ({ discoverHandler }) => {
    // console.log(discoverHandler)
    const { user } = useContext(AuthContext)
    const [clickText, setClickText] = useState("")
    // console.log(clickText)
    const { data: clubInfos = [], isLoading: clubInfosLoading, refetch: clubInfosRefetch } = useQuery({
        queryKey: ["clubRegisterInfo"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/clubRegisterInfo`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(clubInfos)
    const { data: registerClubInfo = [], isLoading: registerClubInfoLoading, refetch: registerClubInfoRefetch } = useQuery({
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
    // console.log(registerClubInfo)
    const { data: eventsInfo = [], isLoading: eventsInfoLoading, refetch: eventsInfoRefetch } = useQuery({
        queryKey: ["allEventsForReg", clickText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allEventsForReg?filterText=${clickText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventsInfo)
    return (
        <div className='bg-[#F2F2F2] pl-3'>
            <div className='py-5  px-3'>
                <h1>Welcome to Dashboard</h1>
            </div>
            <div className='flex'>
                <div className='w-2/3  px-3 pb-10 '>
                    <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5'>
                        <h1 className='pb-3 font-semibold'>Your Club</h1>
                        <div className=''>
                            {
                                registerClubInfo.length === 0 ? <>
                                    {
                                        registerClubInfoLoading ? <>
                                            <div>
                                                <h1 className='bg-white p-3 rounded-lg border'>Loading...</h1>
                                            </div></> : <div>
                                            <h1 className='bg-white p-3 rounded-lg border'>You haven't enrolled any club yet</h1>
                                        </div>
                                    }

                                </> : <>
                                    {
                                        registerClubInfo.map(data => <YourClubChild
                                            key={data._id}
                                            data={data}
                                            discoverHandler={discoverHandler}
                                        ></YourClubChild>)
                                    }</>
                            }
                        </div>
                    </div>
                    <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5'>
                        <div>
                            <h1 className='pb-3 font-semibold'>Registration Now</h1>
                            <div className='grid grid-cols-3 gap-3  '>
                                {
                                    clubInfos.map(data => <ClubCardChild
                                        key={data._id}
                                        data={data}
                                        registerClubInfoRefetch={registerClubInfoRefetch}
                                    ></ClubCardChild>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/3 pr-3 pl-3'>
                    <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5'>
                        <h1 className='pb-3 font-semibold'>Events Registration</h1>
                        <div className='flex justify-between text-sm pb-5'>
                            <div>
                                <button onClick={() => setClickText("")}>All</button>
                            </div>
                            <div className='flex justify-end  gap-4 pb-2'>
                                <button className="tooltip" data-tip='Programming Club' onClick={() => setClickText("Programming Club")}>P</button>
                                <button className="tooltip" data-tip='STEM Club' onClick={() => setClickText("STEM Club")}>S</button>
                                <button className="tooltip" data-tip='Cyber Club' onClick={() => setClickText("Cyber Club")}>C</button>
                                <button className="tooltip" data-tip='Debate Club' onClick={() => setClickText("Debate Club")}>D</button>
                                <button className="tooltip" data-tip='Sports Club' onClick={() => setClickText("Sports Club")}>S</button>
                                <button className="tooltip  tooltip-left" data-tip='Language Club' onClick={() => setClickText("Language Club")}>L</button>
                                <button className="tooltip tooltip-left" data-tip='Robotics Club' onClick={() => setClickText("Robotics Club")}>R</button>

                            </div>
                        </div>
                        <div className=''>
                            {
                                eventsInfo.length === 0 ? <>
                                    {
                                        eventsInfoLoading ? <>
                                            <div>
                                                <h1 className='bg-white p-3 rounded-lg border'>Loading...</h1>
                                            </div></> : <div>
                                            <h1 className='bg-white p-3 rounded-lg border'>No Evnets For Registration</h1>
                                        </div>
                                    }

                                </> : <>
                                    {
                                        eventsInfo.map(data => <EventChildDash
                                            key={data._id}
                                            data={data}
                                        ></EventChildDash>)
                                    }</>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;