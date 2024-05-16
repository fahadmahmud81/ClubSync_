import React from 'react';
import { Link } from 'react-router-dom';

const FailPayment = () => {
    return (
        <div className='bg-[#FFF7E1] w-screen h-screen'>
            <div className=' flex items-center justify-center min-h-screen  text-black rounded-lg '>
                <div className='bg-white p-10 rounded-lg shadow-lg'>
                    <h1 className='mb-5'>
                        Something Went wrong! please try again
                    </h1>
                    <Link to='/student_panel' className="border border-[#0B2948] px-4 rounded-lg py-1 ">Previous Page</Link>
                </div>
            </div>
        </div>
    );
};

export default FailPayment;