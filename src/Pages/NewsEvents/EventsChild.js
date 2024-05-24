import { format } from 'date-fns';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';

const EventsChild = ({ data }) => {
    const { eventDate, eventTime, headline, venue, eventDetails, clubName } = data
    const todayDate = new Date();
    const formateDate = format(todayDate, 'PP');
    return (
        <div className='pb-3'>
            <div title='Click to See details' className={` ${eventDate === formateDate ? 'cursor-pointer border border-[#D2DDD4] p-3 rounded-md bg-[#D2DDD4]' : 'cursor-pointer border border-[#D2DDD4] p-3 rounded-md hover:bg-[#F8F8F8]'}`}>
                <h1 className='font-bold text-lg pb-1'>{headline}</h1>
                <div className='flex gap-10 pb-1'>
                    <h1>🕒 {eventDate} at {eventTime}</h1>
                    <h1><IoLocationOutline size={22} className='inline ' /> {venue}</h1>
                </div>
                <div className='flex justify-between'>

                    <h1>Host: {clubName}</h1>
                </div>
            </div>
        </div>
    );
};

export default EventsChild;
