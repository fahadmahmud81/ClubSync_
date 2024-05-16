import React from 'react';
import { Link } from 'react-router-dom';

const RewardsChild = ({ data }) => {
    const { promoCode, companyName, courseName, courseLink, contact, courseFee, clubName, discountCourseFee, courseImg, recommend, publishedDate, publishedDateNum } = data
    const discount = courseFee - discountCourseFee
    const discountRate = ((courseFee - discountCourseFee) / courseFee) * 100;
    return (
        <div className='flex gap-5 bg-white rounded-2xl px-4 py-4 border'>

            <div>
                <img className='w-[190px] h-[130px] rounded-xl' src={courseImg} alt="" />
            </div>
            <div className=''>
                <h1 className='font-semibold  text-[15px] pt-1'>{courseName}</h1>
                <h1 className='text-sm  text-[#B4B6BF]'>{companyName}</h1>
                {/* <h1 className='pt-2'> Discount: {discount} ({discountRate.toFixed(0)})%</h1> */}
                <h1 className='text-sm pt-1'>Price: <span className='font-semibold'>{discountCourseFee}  <strike className="text-sm text-[#B4B6BF] pl-2"> {courseFee}</strike> </span> </h1>
                {/* <h1 className='pt-2'> Last Date: {publishedDate} </h1> */}
                <h1 className='text-sm'>promo: <span>
                    {
                        promoCode ? <>{promoCode}</> : <>Null</>
                    }
                </span></h1>
                <div className='pt-2'>
                    <Link target="_blank" to={courseLink} ><button className="text-violet-500 hover:duration-500 hover:text-blue-500 ">Enroll Now</button ></Link>

                </div>
            </div>

        </div>


    );
};

export default RewardsChild;