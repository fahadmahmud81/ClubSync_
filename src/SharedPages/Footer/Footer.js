import React from 'react';
import { BsTelephoneFill, BsTwitter } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { AiOutlineArrowRight, AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='  bg-white '>
            <footer className="footer  py-10 lg:px-[10%] px-10 bg-[#0A4644] text-white   ">
                <div>
                    <h1 className="tracking-widest">CONTACT INFORMATION</h1>
                    <hr className='mt-4 mb-5 border border-red-500 w-14' />
                    <div className=''>
                        <h1><MdLocationOn size={20} className='inline mr-2 mb-1 text-white' /><span>Kaliakair, Gazipur-1750, Bangladesh.</span> </h1>
                        <h1 className='mt-3'><BsTelephoneFill size={18} className='inline mr-2 mb-1 text-white' /><span>09666775534</span> </h1>
                        <h1 className='mt-3'><AiOutlineMail size={18} className='inline mr-2 mb-1 text-white' /><span>info@bdu.ac.bd</span> </h1>
                        <h1 className='mt-3'><TbWorld size={20} className='inline mr-2 mb-1 text-white' /><a href='https://bdu.ac.bd/' target="_blank" className='hover:tracking-widest hover:duration-500'>Visit Website</a> </h1>
                    </div>
                </div>
                <div>
                    <h1 className="tracking-widest">DEPARTMENT</h1>
                    <hr className='mt-4 mb-5 border border-red-500 w-14' />
                    <div className=''>
                        <h1>Dept. of Internet of things and Robotics Engineering</h1>
                        <h1 className='text-sm hover:text-white hover:tracking-widest hover:duration-500  mt-3'><AiOutlineArrowRight className='inline mb-1 mr-2' />
                            <a href='https://bdu.ac.bd/academic/undergraduate-education/faculty-of-cyber-physical-systems/dept-of-internet-of-things-and-robotics-engineering/bachelor-of-science-in-internet-of-things-and-roboticsengineering' target="_blank" className=''>Bachelor of Science in IRE</a>
                        </h1>
                    </div>
                    <div className='mt-6'>
                        <h1>Dept. of Educational Technology</h1>
                        <h1 className='text-sm hover:text-white hover:tracking-widest hover:duration-500  mt-3'><AiOutlineArrowRight className='inline mb-1 mr-2' />
                            <a href='https://bdu.ac.bd/https://bdu.ac.bd/academic/undergraduate-education/faculty-of-digital-transformations/department-of-educational-technology/bachelor-of-science-in-educational-technology' target="_blank" className=''>Bachelor of Science in ET</a>
                        </h1>
                    </div>
                </div>
                <div>

                    <h1 className="tracking-widest">USEFUL LINKS</h1>
                    <hr className='mt-4 mb-5 border border-red-500 w-14' />
                    <div className=''>
                        <div>

                            <Link to="/" className='hover:text-white hover:tracking-widest hover:duration-500'><AiOutlineArrowRight className='inline mb-1 mr-2' />
                                Home</Link>
                        </div>

                        <div className='mt-3'>

                            <Link to="/" className='hover:text-white hover:tracking-widest hover:duration-500'> <AiOutlineArrowRight className='inline mb-1 mr-2' />
                                Contact</Link>
                        </div>
                        <div className='mt-3'>

                            <Link to="/" className='hover:text-white hover:tracking-widest hover:duration-500'> <AiOutlineArrowRight className='inline mb-1 mr-2' /> Faculty</Link>
                        </div>
                        <div className='mt-3'>
                            <Link to="/" className='hover:text-white hover:tracking-widest hover:duration-500'> <AiOutlineArrowRight className='inline mb-1 mr-2' /> News </Link>
                        </div>
                        <div className='mt-3'>
                            <Link to="/" className='hover:text-white hover:tracking-widest hover:duration-500'> <AiOutlineArrowRight className='inline mb-1 mr-2' /> Research</Link>
                        </div>
                    </div>
                    {/* link */}
                    <div className='ml-[12%] mt-5 flex lg:gap-5 gap-5'>
                        <div className='bg-[#E9EEF5] p-3 rounded-sm text-[#285DA1] hover:bg-[#285da1] hover:text-white hover:duration-500 hover:cursor-pointer'>
                            <a href="https://www.facebook.com/digital.university.bd" target='_blank'> <FaFacebookF /></a>

                        </div>
                        <div className='bg-[#E5F6FE] p-3 rounded-sm text-[#0BACF4] hover:bg-[#0BACF4] hover:text-white hover:duration-500 hover:cursor-pointer'>
                            <BsTwitter />
                        </div>
                        <div className='bg-[#FBE7EB] p-3 rounded-sm text-[#D8163F] hover:bg-[#D8163F] hover:text-white hover:duration-500 hover:cursor-pointer'>
                            <FaPinterestP />
                        </div>

                    </div>
                </div>
            </footer >
            <div className='text-center p-3'>
                <h1 className='text-sm'>Copyright © 2019 - All rights reserved by BDU.</h1>
            </div>
        </div >
    );
};

export default Footer;