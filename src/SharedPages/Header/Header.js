import React, { useState } from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { RxCross1 } from 'react-icons/rx';
const Header = () => {
    const [open, setOpen] = useState(false)
    const closeResNav = () => {
        setOpen(false)
    }
    return (
        <div>
            <Navbar open={open} setOpen={setOpen}></Navbar>
            <div className='lg:block hidden'>
                <div className='bg-[#0A4644] '>
                    <div className='flex justify-center  gap-x-14 pt-4 text-white font-semibold'>
                        <NavLink to='/' className={({ isActive }) =>
                            isActive ? "navLinkCss" : "linkCss"
                        }>Home</NavLink>
                        <NavLink to='/clubs' className={({ isActive }) =>
                            isActive ? "navLinkCss" : "linkCss"
                        }>Clubs</NavLink>
                        <NavLink to='/news_events' className={({ isActive }) =>
                            isActive ? "navLinkCss" : "linkCss"
                        }>News & Events</NavLink>
                        <NavLink to='/achievements' className={({ isActive }) =>
                            isActive ? "navLinkCss" : "linkCss"
                        }>Achievements</NavLink>
                        <NavLink to='/contact_us' className={({ isActive }) =>
                            isActive ? "navLinkCss" : "linkCss"
                        }>Contact Us</NavLink>
                    </div>
                </div>
            </div>
            <div className='lg:hidden block '>
                <div className={`z-50  shadow-2xl absolute left-0 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0 w-3/4 h-full bg-[#0A4644] text-white' : 'translate-x-[-100%]'}`}>
                    <div className='flex justify-end pt-3 px-4 '>

                        <div onClick={() => setOpen(prevOpen => !prevOpen)} className='cursor-pointer text-white border-2 rounded-full p-1 hover:bg-white hover:text-black'>
                            <RxCross1 className='' size={25} />
                        </div>
                    </div>
                    <div onClick={closeResNav} className=' px-7'>
                        <div className='paddingCss'>
                            <NavLink to='/' className={({ isActive }) =>
                                isActive ? "smNavLinkCss" : "smLinkCss"
                            }>Home</NavLink>
                        </div>

                        <div className='paddingCss'>
                            <NavLink to='/clubs' className={({ isActive }) =>
                                isActive ? "smNavLinkCss" : "smLinkCss"
                            }>Clubs</NavLink>
                        </div>

                        <div className='paddingCss'>
                            <NavLink to='/news_events' className={({ isActive }) =>
                                isActive ? "smNavLinkCss" : "smLinkCss"
                            }>News & Events</NavLink>
                        </div>
                        <div className='paddingCss'>
                            <NavLink to='/achievements' className={({ isActive }) =>
                                isActive ? "smNavLinkCss" : "smLinkCss"
                            }>Achievements</NavLink>
                        </div>
                        <div className='paddingCss'>
                            <NavLink to='/contact_us' className={({ isActive }) =>
                                isActive ? "smNavLinkCss" : "smLinkCss"
                            }>Contact Us</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;