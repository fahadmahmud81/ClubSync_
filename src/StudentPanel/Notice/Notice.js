import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import NoticeChild from './NoticeChild';
import { LiaCalendarWeekSolid } from "react-icons/lia";
import Contribution from './Contribution';

const Notice = () => {
    const { user } = useContext(AuthContext);
    const [notices, setNotices] = useState(null);
    const [clickText, setClickText] = useState("")
    // console.log(clickText)
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
    const clubNames = regClubInfoByEmail.map(data => data.clubName);
    const { data: noticeData = [], isLoading: noticeDataLoading, refetch: noticeDataRefetch } = useQuery({
        queryKey: ["noticeDataByClub", clubNames, clickText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/noticeDataByClub?clubNames=${encodeURIComponent(JSON.stringify(clubNames))}&clickText=${clickText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    // console.log(noticeData)
    const noticeHandler = (noticeData) => {
        setNotices(noticeData)
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='py-5 '>
                <h1>Welcome to Notice</h1>
            </div>
            <div className='flex'>
                <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-5 w-[60%]'>
                    <div className='flex justify-between text-sm pb-5'>
                        <div>
                            <button onClick={() => setClickText("")}>All</button>
                        </div>
                        <div className='flex justify-end  gap-4 pb-2'>
                            {
                                clubNames && clubNames.map((data, index) => <button key={index} className="tooltip" data-tip={data} onClick={() => setClickText(data)}>{data.charAt(0)}</button>)
                            }



                        </div>
                    </div>
                    <div>
                        {
                            noticeData.length === 0 ? <>
                                {
                                    noticeDataLoading ? <>
                                        <div>
                                            <h1 className=''>Loading...</h1>
                                        </div></> : <div>
                                        <h1 className=''>No Content</h1>
                                    </div>
                                }

                            </> : <>

                                {
                                    noticeData.map(data => <NoticeChild
                                        key={data._id}
                                        data={data}
                                        noticeHandler={noticeHandler}
                                    ></NoticeChild>)
                                }</>
                        }
                    </div>
                </div>
                <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5 mr-5 w-[40%]'>
                    <Contribution></Contribution>
                </div>
            </div>
            {
                <dialog id="notice_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl ">
                        <h3 className=" text-sm pb-3"> <LiaCalendarWeekSolid size={20} className='inline' />  {notices?.noticeDate}     </h3>
                        <h3 className="font-bold text-lg">Title: {notices?.headline}     </h3>
                        <p className="py-4 text-justify"><span className='font-bold '>Description: </span> {notices?.noticeDetails}  </p>

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

export default Notice;