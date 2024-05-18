import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './CertificatePdf.css';
import { AiFillPrinter } from 'react-icons/ai';
import FloatingIcon from './FloatingIcon';

const CertificatePdf = () => {
    const data = useLoaderData()
    const {
        _id, sortHeadline, uid, stdEmail, stdName, stdPhone, stdSession, stdGender, stdBlood, stdDob, stdImage, eventClubName, eventId, eventRegistrationDateNum, eventRegistrationDate, eventHeadline, eventRegEndDate, status, clubLogo, companyLogo, companyName, presidentSign, gsSign, presidentName, gsName, eventDate
    } = data
    // console.log(data)
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className='flex justify-center flex-col items-center'>
            <FloatingIcon onClick={handlePrint} />
            <div className=''>
                <div className="full">
                    <div className="logo">
                        <img src={clubLogo} alt="Logo" />
                    </div>
                    <div className="name">
                        {stdName}
                    </div>
                    <div class="additional-text">
                        For successfully participating in the {sortHeadline} organized by {companyName} in collaboration with BDU {eventClubName}.

                    </div>
                    <div className="another-text">
                        Event Date: {eventDate}
                    </div>
                    <div className="bottom-left">
                        <div className="imgSign"><img src={presidentSign} alt="" /></div>
                        <span className="bottomMain">{presidentName}</span>
                        <h6 className="bottomExtra">President, {eventClubName}</h6>
                    </div>
                    <div className="bottom-right">
                        <div className="imgSign"><img src={gsSign} alt="" /></div>
                        <span className="bottomMain">{gsName}</span>
                        <h6 className="bottomExtra">General Secretary, {eventClubName}</h6>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default CertificatePdf;