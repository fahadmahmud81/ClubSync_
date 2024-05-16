import React from 'react';
import { Link } from 'react-router-dom';
import community from '../../Assets/clubs/community.png'

const ClubFirstPart = () => {
    return (
        <div>
            <div className='bg-[#0A4644] lg:flex md:flex block lg:px-0 2xl:px-[10%]'>
                <div className='text-white lg:pt-14 2xl:pt-[10%]  pt-8 lg:pl-20 pl-8 lg:pr-0 pr-8 2xl:h-[580px] lg:h-[450px] md:h-[350px] h-[540px] lg:w-[52%] md:w-[52%]'>
                    <h1 className='text-white font-[800] lg:text-[45px]  text-[30px] tracking-wide'>Be a part of the community</h1>
                    <h1 className='lg:pt-8 pt-5 lg:pb-12 pb-9'>APM brings project professionals together to network, learn and share aspects of project management.</h1>
                    <Link to='/register' className="border-2 border-white bg-white text-black rounded-full px-7 py-2 ">Join Now</Link>
                </div>
                <div className=' lg:w-[48%] md:w-[48%]  relative lg:pt-0 pt-5'>
                    <div className='bottom-0 lg:right-[5%]  right-[18%] absolute '>
                        <img className='' src={community} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubFirstPart;
