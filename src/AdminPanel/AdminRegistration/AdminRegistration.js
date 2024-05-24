import React, { useState } from 'react';
import EventMgt from './EventMgt';
import EventMemberInfo from './EventMemberInfo';

const AdminRegistration = () => {
    const [eventMgt, setEventMgt] = useState(true)
    const [memberInfo, setMemberInfo] = useState(false)
    const eventMgtClick = () => {
        setEventMgt(true)
        setMemberInfo(false)

    }
    const memberInfoClick = () => {
        setEventMgt(false)
        setMemberInfo(true)
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='flex gap-8 py-5 bg-[#F2F2F2]'>
                <button onClick={eventMgtClick} className={`font-semibold ${eventMgt ? 'text-blue-500' : ''}`}>Event Management</button>
                <button onClick={memberInfoClick} className={`font-semibold ${memberInfo ? 'text-blue-500' : ''}`}>Member Info</button>
                {/* <button onClick={blogsClick}>Blogs</button> */}
            </div>
            <div className=''>
                {
                    eventMgt && <EventMgt></EventMgt>
                }
                {
                    memberInfo && <EventMemberInfo></EventMemberInfo>
                }

            </div>
        </div>
    );
};

export default AdminRegistration;