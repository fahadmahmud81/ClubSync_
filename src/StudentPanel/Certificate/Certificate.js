import React, { useContext } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';
import CertificateChild from './CertificateChild';
import { Link } from 'react-router-dom';

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
            {/* <div className=''>
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
                            <div className='pl-7'>
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
            </div> */}
            <div className='mb-10'>
                {
                    eventClubInfoByEmail.length > 0 ? <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead className='bg-[#0A2647] text-white'>
                                <tr>


                                    <th>Headline</th>
                                    <th>EventDate</th>

                                    <th >Club</th>
                                    <th>Company</th>

                                    <th>Certi. Status</th>

                                    <th>Certificate Link</th>
                                    {/* <th>Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventClubInfoByEmail && eventClubInfoByEmail.map((data, i) => <tr key={data._id} className="hover">
                                        {/* <th className='bg-white'>{i + 1}</th> */}


                                        <td className=''>

                                            {data?.sortHeadline}</td>
                                        <td>{data?.eventDate}</td>
                                        {/* <td className=''>{data?.stdEmail}</td> */}
                                        <td className=''>{data?.eventClubName}</td>
                                        <td className=''>{data?.companyName}</td>

                                        {
                                            data?.isCertificate === "yes" ? <td className=''>
                                                <h1>{data?.status}</h1>
                                            </td> : <td className=''>
                                                <h1>No Certificate</h1>
                                            </td>
                                        }
                                        <td>
                                            {
                                                data?.isCertificate === "no" ? <>No Certificate</> : <>{
                                                    data?.status === "approved" ? <Link target={"_blank"} to={`/certificatePdf/${data?._id}`} className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1 text-sm hover:bg-[#2f3542] hover:duration-500 hover:text-white" type="submit" >Preview</Link> : <><button className="border border-[#8e7aca] text-[#8e7aca]  px-2 rounded-lg py-1 text-sm  opacity-40 cursor-not-allowed" type="submit" disabled >Preview</button></>
                                                }</>
                                            }
                                        </td>

                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div> : <div>
                        {eventClubInfoByEmailLoading ? <div className='text-center font-medium text-blue-500   my-10'><p >Data Loading...</p></div> :
                            <div className='text-center font-medium text-blue-500   my-10'><p > No data available</p></div>
                        }
                    </div>
                }

            </div>

        </div>
    );
};

export default Certificate;