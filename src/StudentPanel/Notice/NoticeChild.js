import React from 'react';
import { FaMessage } from 'react-icons/fa6';

const NoticeChild = ({ data, noticeHandler }) => {
    const { noticeDate, noticeDateNum, headline, noticeDetails, clubName, clubLogo } = data
    const handleNoticeClick = (noticeData) => {
        noticeHandler(noticeData);
        document.getElementById('notice_modal').showModal();

    };
    return (
        <div className='mb-5 flex justify-between bg-white  p-3 rounded-lg border'>
            <div className='flex w-[60%]'>
                <div className='flex items-center justify-center pl-2'>
                    <div>
                        <h1 className=' font-semibold text-sm'>{headline}</h1>
                        <h1 className='text-sm text-[#B4B6BF]'>{noticeDate}</h1>
                    </div>
                </div>
            </div>

            <div className=' w-[30%] text-sm text-[#B4B6BF]'>
                <h1>{clubName}</h1>
            </div>
            <div>
                <button onClick={() => handleNoticeClick(data)} data-tip="View Details" className='tooltip rounded-full bg-[#3B82F6] p-2'>
                    <FaMessage className='text-white' />
                </button>

            </div>




        </div>
    );
};

export default NoticeChild;