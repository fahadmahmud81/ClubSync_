import React, { useState } from 'react';
import AdminLibrary from './AdminLibrary';
import AdminRewards from './AdminRewards';

const AdminDiscover = () => {
    const [library, setLibrary] = useState(true)
    const [rewards, setRewards] = useState(false)
    const libraryClick = () => {
        setLibrary(true)
        setRewards(false)

    }
    const rewardsClick = () => {
        setLibrary(false)
        setRewards(true)
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='flex gap-8 py-5 bg-[#F2F2F2]'>
                <button onClick={libraryClick} className={`font-semibold ${library ? 'text-blue-500' : ''}`}>Library</button>
                <button onClick={rewardsClick} className={`font-semibold ${rewards ? 'text-blue-500' : ''}`}>Rewards</button>
                {/* <button onClick={blogsClick}>Blogs</button> */}
            </div>
            <div className=''>
                {
                    library && <AdminLibrary></AdminLibrary>
                }
                {
                    rewards && <AdminRewards></AdminRewards>
                }

            </div>
        </div>
    );
};

export default AdminDiscover;