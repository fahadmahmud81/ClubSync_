import React, { useContext } from 'react';
import { AuthContext } from '../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import './SuccessfulPayment.css';
import { HiDownload } from 'react-icons/hi';
import { AiFillPrinter } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ref = React.createRef();
const SuccessfulPayment = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const transactionId = params.get('transactionId');
    // console.log(transactionId)
    const { user } = useContext(AuthContext)
    const { data: stdData = [], isLoading: dataLoading, refetch: dataRefetch } = useQuery({
        queryKey: ["getDataTrans", transactionId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/getDataTrans?transactionId=${transactionId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(stdData)

    return (
        <div className='bg-[#FFF7E1] w-screen h-screen'>
            <div className=' flex items-center justify-center min-h-screen  text-black rounded-lg '>
                <div className='bg-white p-10 rounded-lg shadow-lg'>
                    <h1 className='mb-5'>
                        Congratulations! {stdData?.stdName} order's has been submitted successfully.
                    </h1>
                    <Link to='/student_panel' className="border border-[#0B2948] px-4 rounded-lg py-1 ">Previous Page</Link>
                </div>




                {/*  <div>
                {stdData && <div ref={ref} className='lg:mx-auto lg:w-[700px]  lg:my-10 my-8 border border-amber-500 lg:px-14 lg:pt-5 lg:pb-14 p-3'>
                    <div className=''>
                        <div className='text-center'>
                            <h1 className='font-semibold text-3xl'>{stdData.stdName}</h1>
                            <p className='text-sm mt-2'>Bangabandhu Digital University (BDU)</p>
                        </div>
                        <div className='mt-10 mainTable'>
                            <table className='tableCss'>
                                <thead>
                                    <tr>
                                        <th className='tableHead p-2'> Description</th>
                                        <th className='tableHead p-2'> Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='tableData pl-3'>Club Name</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.clubName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Name</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>ID</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Email</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdEmail}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Phone Number</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdPhone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Phone Number</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdPhone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Session</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdSession}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Gender</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdGender}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Date of Birth</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.stdDob}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Registration Fee</td>
                                        <td className='tableData  p-2'>
                                            {stdData?.registerFee} /-
                                        </td>
                                    </tr>



                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>}
            </div>
            <div className='text-center'>
                <button onClick={() => window.print()} className="border my-10 p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white">
                    <AiFillPrinter className='inline' size={23} />   Direct  Print
                </button>


            </div> */}


            </div>
        </div >
    );
};

export default SuccessfulPayment;