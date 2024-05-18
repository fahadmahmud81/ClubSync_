import React, { useContext } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext)
    const { data: studentInfo = [], isLoading: studentInfoLoading, refetch: studentInfoRefetch } = useQuery({
        queryKey: ["studentInfo", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/studentInfo?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const { data: clubRegStdInfo = [], isLoading: clubRegStdInfoLoading, refetch: clubRegStdInfoRefetch } = useQuery({
        queryKey: ["club_reg_std_data", studentInfo?.clubName],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/club_reg_std_data?clubName=${studentInfo?.clubName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(studentInfo)
    return (
        <div className='bg-[#F2F2F2] pl-3 h-full'>
            <div className='py-5  px-3'>
                <h1>Welcome {studentInfo?.stdName} as <span className='font-bold'>{studentInfo?.clubName}</span> Admin</h1>
            </div>
            <div className='inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-5 mb-5'>
                <div className='flex justify-center'>
                    <h1>Active Club Members: <span className='font-bold'>{clubRegStdInfo?.length}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
