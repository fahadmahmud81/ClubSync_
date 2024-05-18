import React, { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/UserContext';
import toast from 'react-hot-toast';
import { useToken } from '../../Components/useToken';
import LoadingElement from '../../Components/LoadingElement';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './Register.css'
import { Oval, TailSpin } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import useAdmin from '../../Components/useAdmin';
import useStudent from '../../Components/useStudent';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const isMobile = window.innerWidth <= 400;
    const [file, setFile] = useState(null);
    const [blurUid, setBlurUid] = useState('')
    const [registerInfo, setRegisterInfo] = useState(" ")
    const [acknowledged, setAcknowledge] = useState(false)
    const [startDob, setStartDob] = useState(new Date());
    const formattedDob = startDob.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    const imagebbHostKey = process.env.REACT_APP_imagebb_key;
    const { user, registerWithEmailPass, setLoading, profileUpdate, emailVerification, refreshUser, userDelete } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    const [userCreatedEmail, setUserCreatedEmail] = useState(" ");
    const token = useToken(userCreatedEmail)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    // console.log(from)
    const [isAdmin, adminLoading] = useAdmin(userCreatedEmail)
    const [isStudent, studentLoading] = useStudent(userCreatedEmail)
    useEffect(() => {
        if (token) {

            if (isStudent === "student") {
                setProcessing(false)
                setPageLoader(false)
                navigate("/student_panel")
            }
            else if (isAdmin === "admin") {
                setProcessing(false)
                setPageLoader(false)
                navigate("/admin_panel")
            }



        }
    }, [token, isAdmin, isStudent])
    // image validation


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Check if a file is selected
        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Check if the file is an image (based on the file type)
        if (selectedFile.type.startsWith('image/')) {
            // Check the file size (maximum 300KB)
            if (selectedFile.size <= 300 * 1024) {
                setFile(selectedFile);
            } else {
                alert('File size exceeds the maximum limit of 300KB.');
                setFile(null);
            }
        } else {
            alert('Please select an image file.');
            setFile(null);
        }
    }

    // tab close
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!user?.emailVerified || (user?.emailVerified && !acknowledged)) {
                userDelete()
                    .then(() => {
                        // Add any additional code you want to run when the user leaves the page.
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the userDelete() process.
                        console.error('Error deleting user:', error);
                    });
            }

            // Display a confirmation message when the user tries to close the tab.
            event.returnValue = 'Are you sure you want to leave this page?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // blur data fetch
    const uidBlurHandler = (event) => {
        event.preventDefault();
        const stdId = event.target.value.trim();
        setBlurUid(stdId)
    }
    const { data: uidInfo = [], isLoading: uidLoading, refetch: uidRefetch } = useQuery({
        queryKey: ["emailById", blurUid],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/emailById?id=${blurUid}`)
            const data = await res.json()
            return data
        }
    })
    // console.log(uidInfo)
    // for modal
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setProcessing(false)
        setOpen(true)
    };
    const onCloseModal = () => {
        setOpen(false)
        setProcessing(false)
        if (user) {
            userDelete()
                .then(() => {

                })
        }


    };


    // console.log(imagebbHostKey)
    const registerHandler = (event) => {
        event.preventDefault();
        if (!file) {
            alert('File size exceeds the maximum limit of 300KB.');
        }
        else {
            const form = event.target;
            const uid = form.uid.value.trim();
            const stdEmail = form.stdEmail.value.trim();
            const stdName = form.stdName.value.trim();
            const stdPhone = form.stdPhone.value.trim();
            const stdSession = form.stdSession.value;
            const stdDepartment = form.stdDepartment.value;
            const stdGender = form.stdGender.value;
            const stdBlood = form.stdBlood.value;
            const stdDob = formattedDob;
            const stdPassword = form.stdPassword.value.trim();
            const stdImage = form.stdImage.files[0];

            // host image to imagebb and get url
            const formData = new FormData();

            setError(false);
            setProcessing(true)

            formData.append("image", stdImage);
            const url = `https://api.imgbb.com/1/upload?key=${imagebbHostKey}`;
            fetch(url, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(imageData => {
                    // console.log(imageData)
                    if (imageData.success) {
                        const stdImageUrl = imageData.data.url;
                        // console.log(stdImageUrl)
                        const userInfo = {
                            uid,
                            stdEmail,
                            stdName,
                            stdPhone,
                            stdSession,
                            stdGender,
                            stdBlood,
                            stdDob,
                            stdDepartment,
                            stdImageUrl,
                            role: "admin",
                            clubName: "Robotics Club"
                        }
                        setRegisterInfo(userInfo);
                        registerWithEmailPass(stdEmail, stdPassword)
                            .then(result => {

                                emailVerification()
                                    .then(() => {
                                        onOpenModal()
                                        // setProcessing(false)
                                    })
                            })
                            .catch(error => {
                                const message = error.message;
                                // toast.error(message)
                                Swal.fire({
                                    icon: 'error',

                                    title: 'Oops...',
                                    text: `${message}`,
                                    footer: '<a target="_blank" href="/contact_us">Need Help?<a>',
                                });

                                setProcessing(false)
                            })


                    }
                })
        }

    }

    const completeBtnHandler = () => {
        refreshUser()

    }
    // if (clickComplete === true && user?.emailVerified === true) {
    //     console.log(user)
    //     profileUpdate(registerInfo?.stdName)
    //         .then(result => {
    //             saveUserDataToDb(registerInfo)
    //             setPageLoader(true)
    //         })

    // }
    const registerBtnHandler = () => {
        // console.log(user)
        profileUpdate(registerInfo?.stdName, registerInfo?.stdImageUrl)
            .then(result => {
                saveUserDataToDb()
                // setPageLoader(true)
            })
            .catch((error) => {
                setProcessing(false)
            })
    }


    const saveUserDataToDb = () => {
        setPageLoader(true)
        fetch(`http://localhost:5000/registeredStds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    setAcknowledge(true)
                    setOpen(false)
                    setUserCreatedEmail(registerInfo?.stdEmail)
                    setLoading(false)
                    setProcessing(false)
                }
                if (data.insertError) {
                    setProcessing(false)
                    setPageLoader(false)
                    // toast.error("Error")
                    onCloseModal()
                    // userDelete()
                    //     .then(() => {

                    //     })
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a target="_blank" href="/contact_us">Need Help?<a>',

                    });
                }


            })
    }
    if (pageLoader === true) {
        return <LoadingElement></LoadingElement>
    }

    const crossIconHandler = () => {
        navigate(from, { replace: true });
    }

    // password visibility 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className='lg:flex relative'>
                <div className='bg-[#0A4644] lg:w-[50%]  lg:sticky lg:top-0 lg:left-0  lg:h-full relative'>
                    <div className='text-white lg:flex justify-center  lg:h-screen h-80'>
                        <div className='lg:hidden flex justify-end  '>
                            <Link onClick={() => { crossIconHandler() }} className='border-2 border-[white] rounded-full p-1 hover:text-black hover:bg-[white] hover:cursor-pointer hover:transition hover:duration-300 mr-5 mt-3'>
                                <RxCross1 size={25} />
                            </Link>
                        </div>
                        <div className='lg:pl-0 pl-14  lg:pt-24 xl:pt-32 2xl:pt-48 pt-3'>
                            <h1 className='text-[#21d182] lg:text-[2vw] text-2xl '>Welcome to</h1>
                            <h1 className='text-white font-[800] lg:text-[70px] text-[40px]'>BDU <br /> ClubSync</h1>


                        </div>
                    </div>
                    <div className='bottom-0 absolute '>
                        <img src="https://apmv1livestorage.blob.core.windows.net/adb2c/images/thread.png" alt="" />
                    </div>

                </div>
                <div className='lg:w-[50%] lg:px-[96px] 2xl:px-[150px] px-5 lg:py-[33px] py-5 bg-white' >
                    <div className='lg:flex justify-end  hidden'>
                        <Link onClick={() => { crossIconHandler() }} className='border-2 border-[#0A4644] rounded-full p-1 hover:text-white hover:bg-[#0A4644] hover:cursor-pointer hover:transition hover:duration-300'>
                            <RxCross1 size={25} />
                        </Link>
                    </div>
                    <div >
                        <h1 className='text-[#0A4644] font-bold lg:text-3xl text-xl lg:pt-5 pt-2'>Please provide the following details.</h1>
                    </div>
                    <div className='mt-8 p-7 bg-white shadow-md border-t-8 border-[#BE574A] text-[#0A4644]'>
                        <h1>Please fill up the all information correctly and click register button.</h1>
                    </div>
                    <form onSubmit={registerHandler} className='pt-8'>
                        <label>
                            <span className="font-bold text-[#0A4644]">University Id</span>

                            <input onChange={uidBlurHandler} name='uid' type="text" className="mt-1 rounded-md w-full px-3 py-2 mb-5 bg-white border border-black  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required />
                        </label>
                        <label>
                            <span className="font-bold text-[#0A4644]">Email Address</span>

                            <input name='stdEmail' type="email" defaultValue={uidInfo?.email} className="cursor-not-allowed mt-1 rounded-md  w-full px-3 py-2 mb-5 bg-white border border-black  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required disabled />
                        </label>
                        <label className=''>
                            <span className=" font-bold text-[#0A4644]">Certificate Name</span>

                            <input name='stdName' type="text" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border border-black  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required />
                        </label>
                        <label className=''>
                            <span className=" font-bold text-[#0A4644]">Phone Number</span>

                            <input name='stdPhone' type="tel" className="mt-1 rounded-md mb-5 w-full  px-3 py-2 bg-white border border-black  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required />
                        </label>
                        <label className=''>
                            <span className="font-bold text-[#0A4644]">Department</span>
                            <select name='stdDepartment' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border border-black text-sm shadow-sm focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required>

                                <option value='Educational Technology'>Educational Technology</option>
                                <option value='IOT & Robotics Engineering'>IOT & Robotics Engineering</option>
                                <option value='Data Science'>Data Science</option>
                                <option value='Software Engineering'>Software Engineering</option>
                                <option value='Cyber Security'>Cyber Security</option>
                            </select>
                        </label>
                        <label className=''>
                            <span className="font-bold text-[#0A4644]">Session</span>
                            <select name='stdSession' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border border-black text-sm shadow-sm focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required>
                                <option value=''>Select a Session</option>
                                <option value='2018-19'>2018-19</option>
                                <option value='2019-20'>2019-20</option>
                                <option value='2020-21'>2020-21</option>
                                <option value='2021-22'>2021-22</option>
                            </select>
                        </label>
                        <label className=''>
                            <span className="font-bold text-[#0A4644]">Gender</span>
                            <select name='stdGender' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border border-black text-sm shadow-sm focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required>
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>

                            </select>
                        </label>
                        <label className=''>
                            <span className="font-bold text-[#0A4644]">Blood Group</span>
                            <select name='stdBlood' className="mt-1 rounded-md mb-5 w-full px-3 py-2 bg-white border border-black text-sm shadow-sm focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required>
                                <option value=''>Select a Blood Group</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>

                            </select>
                        </label>

                        <div className=''>
                            <label className="font-bold text-[#0A4644]">Date Of Birth</label>
                            <br />
                            <DatePicker
                                selected={startDob}
                                onChange={(date) => setStartDob(date)}
                                dateFormat="MMMM d, yyyy"
                                className="w-full mt-1 rounded-md mb-5  px-3 py-2 bg-white border border-black text-sm shadow-sm focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644] "
                            />

                        </div>
                        <label className=''>
                            <span className=" font-bold text-[#0A4644]">Profile Image</span>

                            <input
                                name="stdImage"
                                type="file"
                                className="mt-1 rounded-md mb-5 px-3 py-2 w-full bg-white border border-black text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]"
                                accept="image/*" // Accept only image files
                                onChange={handleFileChange}
                                required
                            />
                        </label>
                        <label className=''>
                            <span className=" font-bold text-[#0A4644]">Password</span>

                            <div className="relative">
                                <input
                                    name="stdPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    className="mb-5 mt-1 rounded-md w-full px-3 py-2 bg-white border border-black text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-[35%] transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                >
                                    {showPassword ? '👁' : '👁‍🗨'}
                                </button>
                            </div>
                        </label>

                        <div className='pt-4 flex gap-5'>
                            {
                                processing ? <button className="disabledBtn" type="submit" disabled>
                                    <Oval
                                        height={15}
                                        width={15}
                                        color="#4fa94d"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#4fa94d"
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}

                                    /> <span className='pl-3'>Proceed</span>
                                </button> : <button className="buttonCss" type="submit">Proceed</button>
                            }
                            <Link to='/' className="buttonCss">Cancel</Link>
                        </div>
                        <div className='pt-8'>
                            <h1>Already have an account? <Link to="/login" className='font-bold text-[#0A4644] border-b-2 border-red-500 hover:border-[#0A4644] '>Login</Link></h1>
                        </div>
                    </form>
                </div>
            </div>
            {
                open && <Modal open={open} onClose={onCloseModal} center>
                    <div className='pr-10 lg:w-[500px] mt-5 '>
                        <div className='mt-8 p-3 bg-white shadow-md border-t-8 border-[#0A4644] text-[#0A4644]'>
                            <h1>"Please check your email for a verification link. Once you've verified your email, click the 'Complete' button to finish the process."</h1>
                            <div className='pt-8 flex gap-5'>
                                {
                                    user?.emailVerified ?
                                        <button className="disabledBtn" disabled>Verified</button> :
                                        <button onClick={() => completeBtnHandler()} className="buttonCss">Ok</button>
                                }

                                {user?.emailVerified ?
                                    <button onClick={() => registerBtnHandler()} className="buttonCss">Register</button> : <button className="disabledBtn" disabled>Register</button>
                                }

                            </div>
                        </div>

                    </div>
                </Modal>
            }


        </div >
    );
};

export default Register;