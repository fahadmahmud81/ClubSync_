import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/UserContext';
import toast from 'react-hot-toast';
import { useToken } from '../../Components/useToken';
import { Oval } from 'react-loader-spinner';
import LoadingElement from '../../Components/LoadingElement';
import { RxCross1 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import useSuperAdmin from '../../Components/useSuperAdmin';
import useClubAdmin from '../../Components/useClubAdmin';
import useStudent from '../../Components/useStudent';
import useAdmin from '../../Components/useAdmin';
import useAdvisor from '../../Components/useAdvisor';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const { user, loginWithEmailPass, passwordReset } = useContext(AuthContext);
    const [pageLoader, setPageLoader] = useState(false);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()
    const [tokenEmail, setTokenEmail] = useState('')
    const token = useToken(tokenEmail)
    const [isAdmin, adminLoading] = useAdmin(tokenEmail)
    const [isStudent, studentLoading] = useStudent(tokenEmail)
    const [isAdvisor, advisorLoading] = useAdvisor(tokenEmail)
    // console.log(isStudent)
    useEffect(() => {
        if (token) {
            // setProcessing(false)
            // setPageLoader(false)
            // navigate('/')
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
            else if (isAdvisor === "advisor") {
                setProcessing(false)
                setPageLoader(false)
                navigate("/advisor_panel")
            }



        }
    }, [token, isAdmin, isStudent, isAdvisor])

    const loginHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const stdEmail = form.stdEmail.value.trim();
        const stdPassword = form.stdPassword.value.trim();
        setProcessing(true);
        loginWithEmailPass(stdEmail, stdPassword)
            .then(result => {
                setTokenEmail(stdEmail)
                setPageLoader(true)
            })
            .catch(error => {
                const message = error.message
                setProcessing(false)
                // toast.error(message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${message}`,
                    footer: '<a target="_blank" href="/contact_us">Need Help?<a>',

                });
            })
    }
    if (pageLoader) {
        return <LoadingElement></LoadingElement>
    }
    // password visibility 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const forgottenPasswordHander = () => {
        if (email) {
            passwordReset(email)
                .then(() => {
                    alert("Password reset email sent successfuly!")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(errorMessage)
                    /*  toast.error(errorMessage, {
                         style: {
                             border: '1px solid red',
                             padding: '16px',
                             color: '#0A4644',
                         },
                         iconTheme: {
                             primary: 'red',
                             secondary: '#FFFAEE',
                         },
                     }); */
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${errorMessage}`,
                        footer: '<a target="_blank" href="/contact_us">Need Help?<a>',

                    });
                });
        }
        else {
            alert("Please type your registered gmail")
        }

    }
    return (
        <div>
            <div className='lg:flex lg:h-[100vh]'>
                <div className='bg-[#0A4644] lg:w-[50%] relative'>
                    <div className='text-white lg:flex justify-center  lg:h-screen h-80'>
                        <div className='lg:hidden flex justify-end  '>
                            <Link to='/' className='border-2 border-[white] rounded-full p-1 hover:text-black hover:bg-[white] hover:cursor-pointer hover:transition hover:duration-300 mr-5 mt-3'>
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
                <div className='lg:w-[50%] lg:px-[96px] 2xl:px-[150px] px-5 lg:py-[33px] py-5 bg-white'>
                    <div className='lg:flex justify-end hidden'>
                        <Link to="/" className='border-2 border-[#0A4644] rounded-full p-1 hover:text-white hover:bg-[#0A4644] hover:cursor-pointer hover:transition hover:duration-300'>
                            <RxCross1 size={25} />
                        </Link>
                    </div>
                    <div >
                        <h1 className='text-[#0A4644] font-bold lg:text-3xl text-xl'>
                            Sign in with your
                            existing account
                        </h1>
                    </div>
                    <form onSubmit={loginHandler} className='pt-8'>
                        <label>
                            <span className="font-bold text-[#0A4644]">Email Address</span>

                            <input name='stdEmail' type="email" className="mt-1 rounded-md w-full px-3 py-2 mb-5 bg-white border border-black  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#0A4644] focus:ring-1 focus:ring-[#0A4644]" required
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className=''>
                            <div className='flex justify-between'>
                                <span className=" font-bold text-[#0A4644]">Password</span>
                                <span onClick={() => forgottenPasswordHander()} className='text-sm font-semibold text-[#0A4644] border-b-2 border-red-500 hover:border-[#0A4644] hover:cursor-pointer'>Forgotten your password?</span>
                            </div>

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

                                    /> <span className='pl-3'>Processing</span>
                                </button> : <button className="buttonCss" type="submit">Login</button>
                            }
                            <Link to='/' className="buttonCss">Cancel</Link>
                        </div>
                        <div className='pt-8'>
                            <h1>Don't have an account? <Link to="/register" className='font-bold text-[#0A4644] border-b-2 border-red-500 hover:border-[#0A4644] '>Register</Link></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;