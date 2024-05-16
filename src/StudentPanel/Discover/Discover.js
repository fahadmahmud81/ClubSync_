import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import Library from './Library';
import Rewards from './Rewards';
import Blogs from './Blogs';

const Discover = () => {
    const { user } = useContext(AuthContext);
    const [library, setLibrary] = useState(true)
    const [rewards, setRewards] = useState(false)
    const [blogs, setBlogs] = useState(false)


    // console.log(contentByClub)
    const libraryClick = () => {
        setLibrary(true)
        setRewards(false)
        setBlogs(false)
    }
    const rewardsClick = () => {
        setLibrary(false)
        setRewards(true)
        setBlogs(false)
    }
    const blogsClick = () => {
        setLibrary(false)
        setRewards(false)
        setBlogs(true)
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
                    library && <Library></Library>
                }
                {
                    rewards && <Rewards></Rewards>
                }
                {
                    blogs && <Blogs></Blogs>
                }
            </div>
        </div>
    );
};

export default Discover;