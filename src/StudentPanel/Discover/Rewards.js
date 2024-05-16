import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AuthContext } from '../../ContextApi/UserContext';
import PopularContentChild from './PopularContentChild';
import RewardsChild from './RewardsChild';

const Rewards = () => {
    const { user } = useContext(AuthContext);
    const [discountType, setDiscountType] = useState("all")
    const [searchText, setSearchText] = useState("")
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
    // console.log(clubNames)
    // get youtube content by club name 
    const { data: discountDataByClub = [], isLoading: discountDataByClubLoading, refetch: discountDataByClubRefetch } = useQuery({
        queryKey: ["discountDataByClub", clubNames, discountType, searchText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/discountDataByClub?clubNames=${encodeURIComponent(JSON.stringify(clubNames))}&discountType=${discountType}&searchText=${searchText}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            });
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
    // console.log(searchText)
    const allClick = () => {
        setSearchText("")
        setDiscountType("all")
    }
    const recommendedClick = () => {
        setSearchText("")
        setDiscountType("recommended")
    }
    return (
        <div className='pr-3'>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5'>
                <div className='flex justify-between'>
                    <div className='flex gap-7'>
                        <button onClick={allClick} className={`pb-3 font-semibold ${discountType === "all" ? 'text-blue-500' : ''}`}>All</button>
                        <button onClick={recommendedClick} className={`pb-3 font-semibold ${discountType === "recommended" ? 'text-blue-500' : ''}`}>Recommended </button>
                    </div>
                    <div className='pb-5'>
                        <form onSubmit={textHandler} action="" className='flex gap-2'>
                            <input name='search' type="text" className="mt-1 rounded-full py-1  px-3  bg-white border   text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" placeholder='Search Here' />


                            <button onClick={() => setDiscountType("")} className='border  rounded-full p-1   hover:duration-500 hover:text-blue-500 ' type="submit"><IoIosSearch size={25} /></button>




                        </form>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3 '>
                    {
                        discountDataByClub.length === 0 ? <>
                            {
                                discountDataByClubLoading ? <>
                                    <div>
                                        <h1 className=''>Loading...</h1>
                                    </div></> : <div>
                                    <h1 className=''>No Content</h1>
                                </div>
                            }

                        </> : <>
                            {
                                discountDataByClub.map(data => <RewardsChild
                                    key={data._id}
                                    data={data}
                                ></RewardsChild>)
                            }</>
                    }
                </div>
            </div>

        </div>
    );
};

export default Rewards;