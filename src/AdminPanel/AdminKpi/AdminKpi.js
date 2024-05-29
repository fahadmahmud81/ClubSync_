import React, { useState } from 'react';
import AdminKpi2 from './AdminKpi2';
import ExecutiveInfo from './ExecutiveInfo';

const AdminKpi = () => {
    const [kpi, setKpi] = useState(true)
    const [executiveInfo, setExecutiveInfo] = useState(false)
    const kpiClick = () => {
        setKpi(true)
        setExecutiveInfo(false)

    }
    const executiveInfoClick = () => {
        setKpi(false)
        setExecutiveInfo(true)
    }
    return (
        <div className='pl-6 bg-[#F2F2F2] h-full'>
            <div className='flex gap-8 py-5 bg-[#F2F2F2]'>
                <button onClick={kpiClick} className={`font-semibold ${kpi ? 'text-blue-500' : ''}`}>KPI</button>
                <button onClick={executiveInfoClick} className={`font-semibold ${executiveInfo ? 'text-blue-500' : ''}`}>Executive Info</button>
                {/* <button onClick={blogsClick}>Blogs</button> */}
            </div>
            <div className=''>
                {
                    kpi && <AdminKpi2></AdminKpi2>
                }
                {
                    executiveInfo && <ExecutiveInfo></ExecutiveInfo>
                }

            </div>
        </div>
    );
};

export default AdminKpi;
