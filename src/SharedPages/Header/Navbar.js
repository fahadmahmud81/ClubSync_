import React, { useContext, useState } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/UserContext';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import clubLogo from "../../Assets/clubLogo/club_logo.jpg";
import Swal from 'sweetalert2';

const Navbar = ({ open, setOpen }) => {

    // console.log(open)
    // const [open, setOpen] = useState(false)
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate()
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const onCloseLogoutModal = () => setOpenLogoutModal(false)
    const onOpenLogoutModal = () => setOpenLogoutModal(true)
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open); // Update the 'open' state
    };

    const logOutHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        navigate('/')
                        // setOpenLogoutModal(false)
                        Swal.fire({
                            title: "Logout!",
                            text: "Successfully Logout",
                            icon: "success"
                        });

                    })
                    .catch(error => {
                        // console.log(error.message)
                        Swal.fire({
                            title: "Eror",
                            text: "Something Went Wrong",
                            icon: "error"
                        });
                    })

            }
        });

    }
    /* const logOutHandler = () => {
        logout()
            .then(() => {
                navigate('/')
                setOpenLogoutModal(false)

            })
            .catch(error => {
                // console.log(error.message)

            })
    } */

    return (
        <div>
            <div className='lg:block hidden '>
                <div className='bg-[#DFE0E1] flex justify-between px-24 py-4'>
                    <div>
                        {/* <img className='h-[50px]' src={clubLogo} alt="" /> */}
                    </div>
                    <div >
                        {
                            user ?
                                <div className='flex justify-center items-center gap-2 pt-1'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ring ring-[#0A4644] ring-offset-base-100 ring-offset-2">
                                            <img title={user?.displayName} src={user?.photoURL} alt='' />
                                        </div>
                                    </div>
                                    <div className='dropdown'>
                                        <button className='dropbtn' onClick={toggleDropdown}> <MdOutlineArrowDropDownCircle size={20} /></button>
                                        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} onClick={closeDropdown}>
                                            <Link className='hoverMenu'>Settings</Link>
                                            <Link onClick={logOutHandler} className='hoverMenu'>Log Out </Link>
                                        </div>
                                    </div>
                                </div> :
                                <div className='flex justify-center items-center gap-5 pt-1'>
                                    <Link to="/register" className="buttonCss">Register</Link>
                                    <Link to="/login" className="buttonCss">Login</Link>
                                </div>
                        }


                    </div>
                </div>
            </div>
            {/* for small divices */}
            <div className='lg:hidden block '>
                <div className='bg-[#DFE0E1] flex justify-between px-2 py-2'>
                    <div onClick={handleToggle} className=' cursor-pointer rounded-sm pt-2'>
                        <FaBars className=' text-[#0A4644]' size={20} />
                    </div>
                    <div>
                        <img className='h-[30px]' src="https://apmv2-live-cms.azurewebsites.net/Ibis/dist/images/logo-full.svg" alt="" />
                    </div>
                    <div >
                        {
                            user ?
                                <div className='flex justify-center items-center  pt-1'>
                                    <div className="avatar dropdown">
                                        <div className="w-8 rounded-full ring ring-[#0A4644] ring-offset-base-100 ring-offset-2 ">
                                            <button onClick={toggleDropdown} className='dropbtn'>
                                                <img title={user?.displayName} src={user?.photoURL} alt='' />
                                            </button>
                                            {
                                                isDropdownOpen && <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} onClick={closeDropdown}>
                                                    <Link className='hoverMenu'>Settings</Link>
                                                    <Link onClick={onOpenLogoutModal} className='hoverMenu'>Log Out </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div> :
                                <div className='flex justify-center items-center  '>
                                    <div className='dropdown'>
                                        <button className='dropbtn' onClick={toggleDropdown}>
                                            <FaUserCircle size={35} />
                                        </button>
                                        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} onClick={closeDropdown}>
                                            <Link to='/register' className='hoverMenu'>Register</Link>
                                            <Link to='/login' className='hoverMenu'>Login </Link>
                                        </div>
                                    </div>

                                </div>
                            /* <div className='flex justify-center items-center gap-5 pt-1'>
                                <Link to="/register" className="buttonCss">Register</Link>
                                <Link to="/login" className="buttonCss">Login</Link>
                            </div> */
                        }


                    </div>
                </div>
            </div>
            {/* {openLogoutModal &&
                <Modal open={openLogoutModal} onClose={onCloseLogoutModal} center>
                    <div className=' lg:w-[500px] mt-5 '>
                        <div className="avatar flex justify-center">
                            <div className="w-28 rounded-full ring ring-[#0A4644] ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt='' />
                            </div>

                        </div>
                        <div className='flex justify-center mt-2 font-semibold'>
                            <h1>{user?.displayName}</h1>

                        </div>

                        <div className='flex justify-center pt-5'>
                            <button onClick={logOutHandler} className="buttonCss">Confirm Logout</button>
                        </div>
                    </div>
                </Modal>
            } */}
        </div>
    );
};

export default Navbar;