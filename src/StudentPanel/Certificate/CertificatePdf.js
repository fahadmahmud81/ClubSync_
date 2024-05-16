import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './CertificatePdf.css'

const CertificatePdf = () => {
    const data = useLoaderData()
    const {
        _id, sortHeadline, uid, stdEmail, stdName, stdPhone, stdSession, stdGender, stdBlood, stdDob, stdImage, eventClubName, eventId, eventRegistrationDateNum, eventRegistrationDate, eventHeadline, eventRegEndDate, status, clubLogo, companyLogo, companyName, presidentSign, gsSign, presidentName, gsName, eventDate
    } = data
    // console.log(data)
    const certificateData = {
        recipientName: "John Doe",
        courseName: "React Mastery Course",
        completionDate: "May 15, 2024",
        instructorName: "Jane Smith",
        certificateId: "13" // Assuming you pass the certificate ID through route params
    };
    return (
        <div></div>
    );
};

export default CertificatePdf;