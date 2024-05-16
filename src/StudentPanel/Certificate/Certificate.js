import React, { useContext } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import CertificateChild from './CertificateChild';

const Certificate = () => {
    const { user } = useContext(AuthContext);
    const { data: eventClubInfoByEmail = [], isLoading: eventClubInfoByEmailLoading, refetch: eventClubInfoByEmailRefetch } = useQuery({
        queryKey: ["eventRegisterInfoByGmail", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/eventRegisterInfoByGmail?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(eventClubInfoByEmail)
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full pr-3'>
            <div className='py-5 '>
                <h1>Welcome to Certificate</h1>
            </div>
            <div className=''>
                {
                    eventClubInfoByEmail.length === 0 ? <>
                        {
                            eventClubInfoByEmailLoading ? <>
                                <div>
                                    <h1 className=''>Loading...</h1>
                                </div></> : <div>
                                <h1 className=''>No Content</h1>
                            </div>
                        }

                    </> : <>
                        <div className='mb-5 flex justify-between  items-center p-3 rounded-lg border'>
                            <div className='flex w-[30%]'>


                                <h1>Title</h1>
                            </div>
                            <div className='flex justify-center items-center w-[22%]'>
                                <h1>Club Name</h1>

                            </div>
                            <div className=''>
                                <h1>Status</h1>
                            </div>
                            <div className=''>
                                <h1 >Certificate Link</h1>
                            </div>
                        </div>
                        {
                            eventClubInfoByEmail.map(data => <CertificateChild
                                key={data._id}
                                data={data}
                            ></CertificateChild>)
                        }</>
                }
            </div>

        </div>
    );
};

export default Certificate;