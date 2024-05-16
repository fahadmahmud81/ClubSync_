import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';

import './ContactUs.css';
import { FaPinterestP } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div className=' bg-white text-black lg:pb-20 pb-10'>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29143.830409815146!2d90.22050005!3d24.067051049999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e3cf1ea16e0b%3A0x4e0bfa8fd7c88324!2sBangabandhu%20Sheikh%20Mujibur%20Rahman%20Digital%20University!5e0!3m2!1sen!2sbd!4v1685119177057!5m2!1sen!2sbd" width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='lg:mx-20 mx-3 mt-7'>
                {/* <div className=' lg:p-5 p-3 border  rounded-sm lg:text-xl font-semibold text-black tracking-widest'>
                    <h1>Contact With Us</h1>
                </div> */}
                <div className='lg:flex justify-center gap-14 mt-6'>
                    <div className='lg:w-[60%]'>
                        <div className=''>
                            <h1 className='text-3xl font-semibold tracking-widest'>Send a Message</h1>
                            <form className='mt-7'>
                                <div className='lg:flex lg:justify-between lg:gap-5'>
                                    <label className='lg:w-full'>
                                        <span className="text-sm font-medium text-slate-700">Name</span>

                                        <input name='name' type="text" className="h-14 bg-[#F3F4F8] mt-1 mb-2 w-full px-3 py-2  border   text-sm shadow-sm placeholder-[#0A4644]
                                     focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:[#0A4644] rounded" required />
                                    </label>
                                    <label className='lg:w-full'>
                                        <span className="text-sm font-medium text-slate-700">Email</span>

                                        <input name='email' type="text" className="h-14 bg-[#F3F4F8] mt-1 mb-2 w-full px-3 py-2  border   text-sm shadow-sm placeholder-[#0A4644]
                                     focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:[#0A4644] rounded" required />
                                    </label>
                                </div>
                                <div className='mt-3'>
                                    <span className="text-sm font-medium text-slate-700">Subject</span>

                                    <input name='subject' type="eamil" className="h-14 bg-[#F3F4F8] mt-1 mb-2 w-full px-3 py-2  border   text-sm shadow-sm placeholder-[#0A4644]
                                     focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:[#0A4644] rounded" required />
                                </div>
                                <div className='mt-3'>
                                    <span className="text-sm font-medium text-slate-700 ">Message</span>

                                    <textarea name='message' type="eamil" className="h-24 bg-[#F3F4F8] mt-1 mb-2 w-full px-3 py-2  border  text-sm shadow-sm placeholder-[#0A4644]
                                     focus:outline-none  focus:border-[#0A4644] focus:ring-1  rounded" required />
                                </div>

                                <div className='my-7'>

                                    <button type="submit"
                                        className='btn-send'>Send Message
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='lg:mt-0 mt-5 lg:w-[50%] lg:pb-0 pb-10'>
                        <div>
                            <h1 className='text-3xl font-semibold tracking-widest'>Contact Information</h1>
                            <div className='mt-6 bg-white shadow-2xl lg:p-10 p-10  rounded-md '>
                                <h1 className='font-semibold text-lg tracking-widest'> <MdLocationOn size={25} className='inline mr-5 mb-1 text-[#0A4644]' />Campass Address</h1>
                                <h1 className='ml-[12%] mt-3'>Kaliakair, Gazipur-1750, Bangladesh.</h1>

                                <h1 className='font-semibold text-lg tracking-widest mt-3'> <BsTelephoneFill size={23} className='inline mr-5 mb-1 text-[#0A4644]' />Telephone</h1>
                                <h1 className='ml-[12%] mt-3'>09666775534</h1>

                                <h1 className='font-semibold text-lg tracking-widest mt-3'> <AiOutlineMail size={23} className='inline mr-5 mb-1 text-[#0A4644]' />Email us directly</h1>
                                <h1 className='ml-[12%] mt-3'>
                                    <Link to="mailto:info@bdu.ac.bd" >
                                        info@bdu.ac.bd
                                    </Link>
                                </h1>
                                <h1 className='font-semibold text-lg tracking-widest mt-3'> <TbWorld size={23} className='inline mr-5 mb-1 text-[#0A4644]' />Website</h1>
                                <h1 className='ml-[12%] mt-3'><Link to='https://bdu.ac.bd/' target="_blank" className='hover:text-[#0A4644] hover:tracking-widest hover:duration-500'>https://bdu.ac.bd</Link> </h1>

                                <h1 className='font-semibold text-lg tracking-widest mt-3'> <TbWorld size={23} className='inline mr-5 mb-1 text-[#0A4644]' />Follow Us</h1>
                                <div className='ml-[12%] mt-5 flex lg:gap-5 gap-5'>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;