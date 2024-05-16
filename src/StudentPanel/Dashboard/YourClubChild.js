import React from 'react';
import demologo from '../../Assets/demo.png'
import { Link } from 'react-router-dom';
import { MdEvent } from 'react-icons/md';

const YourClubChild = ({ data, discoverHandler }) => {
    const { clubName, clubImage, stdName, registrationDate } = data
    return (
        <div className='mb-5 flex justify-between bg-white items-center p-3 rounded-lg border'>
            <div className='flex w-[40%]'>
                <div className="avatar">
                    <div className="w-11 rounded-full">
                        <img src={demologo} alt="" />
                    </div>

                </div>
                <div className='flex items-center justify-center pl-3'>
                    <div>
                        <h1 className=' font-semibold'>{clubName}</h1>
                        <h1 className='text-sm text-[#B4B6BF]'>{registrationDate}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <h1><MdEvent size={20} /></h1>
                <h1> <Link to="/news_events" className='hover:text-[#111e8d] hover:duration-500 pl-1'>Events</Link></h1>
            </div>
            <div>
                ⭐ 4.5
            </div>
            <div>
                <button onClick={discoverHandler} to='/discover' className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1 text-sm hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >View Club</button>
            </div>
        </div>
    );
};

export default YourClubChild;