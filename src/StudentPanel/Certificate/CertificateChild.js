import React, { useState } from 'react';


import { Link } from 'react-router-dom';

const CertificateChild = ({ data }) => {
    const {
        _id, sortHeadline, uid, stdEmail, stdName, stdPhone, stdSession, stdGender, stdBlood, stdDob, stdImage, eventClubName, eventId, eventRegistrationDateNum, eventRegistrationDate, eventHeadline, eventRegEndDate, status, clubLogo, companyLogo, companyName, presidentSign, gsSign, presidentName, gsName, eventDate, isCertificate
    } = data


    return (
        <div className='mb-5 flex justify-between bg-white items-center p-3 rounded-lg border'>
            <div className='flex w-[30%]'>
                <div className="avatar">
                    <div className="w-11 rounded-full">
                        <img src={clubLogo} alt="" />
                    </div>

                </div>
                <div className='flex items-center justify-center pl-3'>
                    <div>
                        <h1 className=' font-semibold'>{sortHeadline}</h1>
                        <h1 className='text-sm text-[#B4B6BF]'>{eventDate}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center w-[20%]'>
                <h1>{eventClubName}</h1>

            </div>
            <div className=''>
                {
                    isCertificate === "yes" && <h1>{status}</h1>
                }

            </div>
            <div className=''>
                {
                    isCertificate === "no" ? <>No Certificate</> : <>{
                        status === "approved" ? <Link target={"_blank"} to={`/certificatePdf/${_id}`} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1 text-sm hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Preview</Link> : <><button className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1 text-sm  opacity-40 cursor-not-allowed" type="submit" disabled >Preview</button></>
                    }</>
                }

            </div>
            {/* modal */}

        </div>
    );
};

export default CertificateChild;