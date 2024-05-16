import React, { useEffect, useState } from 'react';
import { BsArrowRight, BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaLinkedin, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import pClub from '../../../Assets/clubs/p-logo.png';
import '../AllClubs/ProgrammingClub.css';
import ProgrammingClubMembers from './ProgrammingClubMembers';

const ProgrammingClub = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1// optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };



    return (
        <div>
            <div className='lg:flex lg:gap-x-14'>
                <div className='relative'>
                    <h1 className='lg:text-[20px] text-[15px] font-bold'>Elevate your coding skills, join the BDU Programming Club, where innovation meets collaboration!</h1>
                    <h1 className='mt-3  text-justify'>
                        "BDU Programming Club is a dynamic community that ignites the spark of innovation. Our motto, 'Think, Code, and Innovate,' is not just a phrase, but a way of life for our members. Here, we encourage members to explore their technical curiosity, turn ideas into reality through coding, and foster an environment where innovation flourishes."
                    </h1>
                    {/* <Link to='/register' className="border-2 border-[#0A4644] bg-white text-black rounded-full px-7 py-2 hover:bg-[#0A4644] hover:text-white">Join With Us</Link> */}
                    <div className='lg:absolute lg:bottom-0'>
                        <div className='mt-3 hover:tracking-widest hover:duration-500 hover:text-[#0A4644] font-semibold'>
                            Connect With Us <BsArrowRight className='inline' />
                        </div>
                        <div className='mt-5 lg:mb-0 mb-5 flex lg:gap-5 gap-5'>
                            <Link to="https://www.facebook.com/pc.bdu" target='_blank' className='bg-[#E9EEF5] p-3 rounded-sm text-[#285DA1] hover:bg-[#285da1] hover:text-white hover:duration-500 hover:cursor-pointer'>
                                <FaFacebookF />
                            </Link>
                            <Link to="https://www.linkedin.com/school/bdu-bd/" target='_blank' className='bg-[#E5F6FE] p-3 rounded-sm text-[#0BACF4] hover:bg-[#0BACF4] hover:text-white hover:duration-500 hover:cursor-pointer'>
                                <FaLinkedin />
                            </Link>
                            <Link to="https://www.youtube.com/@BangabandhuDigitalUniversity" target="_blank" className='bg-[#FBE7EB] p-3 rounded-sm text-[#D8163F] hover:bg-[#D8163F] hover:text-white hover:duration-500 hover:cursor-pointer'>
                                <FaYoutube />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='lg:block hidden'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/rXSWbpUVG3Q?si=utkndGk63sQbWWAg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

            </div>
            {/* mobile screen youtube video */}
            <div className='lg:hidden block'>
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/rXSWbpUVG3Q?si=utkndGk63sQbWWAg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>
            <div className='lg:my-20 my-7'>
                <Carousel
                    responsive={responsive}
                    showDots={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    transitionDuration={500}
                    infinite={true}
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}

                    className='lg:-z-0 '
                >
                    <div className=' bg-[#F7F7F7] lg:p-10 p-5 rounded-2xl'>
                        <div className='lg:flex  '>
                            <div className='lg:mr-36 text-justify'>
                                <h1><b> BDU Programming Club:</b> Fostering Innovation through Code. We're a dynamic community where thinkers and coders come together to innovate. <b> Whether you're a novice or an expert, we're all about continuous learning and collaborative growth.</b> With 'Think, Code, and Innovate' as our motto, we're driven to explore the ever-evolving tech landscape. </h1>
                                <div className='mt-5 flex gap-x-3'>
                                    <div className="avatar">
                                        <div className="lg:w-[60px]  w-[70px] rounded-full ">
                                            <img src="https://i.ibb.co/Tmyx57v/1000029504.jpg" alt='' />
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <h1 className='font-bold'>Aditya Rajbongshi</h1>
                                        <h1>Advisor, BDU Programming Club</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%] lg:block hidden'>

                                <img className='' src={pClub} alt='' />

                            </div>
                        </div>
                    </div>
                    {/* bg-[#D2DDD4] */}
                    <div className=' bg-[#F7F7F7] lg:p-10 p-5 rounded-2xl'>
                        <div className='lg:flex  '>
                            <div className='lg:mr-36 text-justify'>
                                <h1><b>In my role as the Director of Student Welfare at BDU, </b> I am delighted to shed light on the BDU Programming Club, an embodiment of our motto: Reflect, Code, and Pioneer.This isn't merely a club; <b> it's a thriving community where intellects converge to explore technology, collaborate, and cultivate innovation.</b> </h1>
                                <div className='mt-5 flex gap-x-3'>
                                    <div className="avatar">
                                        <div className="lg:w-[60px]  w-[70px] rounded-full ">
                                            <img src="https://i.ibb.co/WBDSn0x/1000029505.jpg" alt='' />
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <h1 className='font-bold'>Farhana Islam</h1>
                                        <h1>Director of Student Welfare, BDU</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%] lg:block hidden'>

                                <img className='' src={pClub} alt='' />

                            </div>
                        </div>
                    </div>

                </Carousel>
            </div>
            <div className=''>
                <ProgrammingClubMembers></ProgrammingClubMembers>
            </div>
            <div className='lg:my-20 my-5'>
                <h1 className='text-xl font-bold text-[#0A4644] tracking-widest lg:mb-10 mb-5 text-center'>Highlighted Events</h1>
                <div className='lg:flex lg:gap-x-10'>
                    <div className='lg:w-[45%]'>
                        <img className='' src="https://i.ibb.co/CwWDwgm/top-event-1.jpg" alt="" />
                    </div>
                    <div className='lg:w-[50%]'>
                        <h1 className='text-lg font-bold text-[#0A4644] tracking-widest mb-4 lg:pt-0 pt-3 underline'>🚀 Exciting News for Aspiring App Developers! 📱
                        </h1>
                        <h1><span className='font-bold text-[#0A4644]'>📅 21 September 2023 | 🕒 1:00 PM - 3:00 PM </span></h1>
                        <h1>Venue: Academic Building, BDU</h1>
                        <h1 className='mt-6'>
                            BDU Programming Club is thrilled to announce a special offline workshop: "A Beginner's Guide to App Development," in collaboration with the experts from Creative IT Institute.
                        </h1>
                        <div className='flex mt-6'>
                            <Link to='' className="buttonCss">Find Out More</Link>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>



        </div >
    );
};

export default ProgrammingClub;