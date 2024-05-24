import React, { useState } from 'react';
import { BiExpand } from 'react-icons/bi';
import { FaCertificate, FaHome } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { RiCompassDiscoverLine, RiGuideLine } from 'react-icons/ri';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminNotice from './AdminNotice/AdminNotice';
import AdminDiscover from './AdminDiscover/AdminDiscover';
import AdminCertificate from './AdminCertificate/AdminCertificate';
import AdminGuidance from './AdminGuidance/AdminGuidance';
import AdminRegistration from './AdminRegistration/AdminRegistration';
import AdminBudget from './AdminBudget/AdminBudget';
import AdminKpi from './AdminKpi/AdminKpi';

const AdminPanel = () => {
    const { collapseSidebar } = useProSidebar();
    const [dashboard, setDashboard] = useState(true)
    const [discover, setDiscover] = useState(false)
    const [certificate, setCertificate] = useState(false)
    const [guidence, setGuidence] = useState(false)
    const [notice, setNotice] = useState(false)
    const [adminReg, setAdminReg] = useState(false)
    const [adminBudget, setAdminBudget] = useState(false)
    const [adminKpi, setAdminKpi] = useState(false)
    const dashboardHandler = () => {
        setDashboard(true)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const discoverHandler = () => {
        setDashboard(false)
        setDiscover(true)
        setCertificate(false)
        setGuidence(false)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const certificaterHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(true)
        setGuidence(false)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const guidenceHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(true)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const noticeHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
        setNotice(true)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const adminRegHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
        setNotice(false)
        setAdminReg(true)
        setAdminBudget(false)
        setAdminKpi(false)
    }
    const adminBudgetHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(true)
        setAdminKpi(false)
    }
    const adminKpiHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
        setNotice(false)
        setAdminReg(false)
        setAdminBudget(false)
        setAdminKpi(true)
    }
    return (
        <div className='flex '>
            <div className='sticky top-0 z-40 h-screen  bg-[#FDFDFD]'>
                <div>
                    <Sidebar width="160px">
                        <Menu className=' bg-[#FDFDFD] h-screen'
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    // only apply styles on first level elements of the tree
                                    if (level === 0)
                                        return {
                                            color: disabled ? '000000' : '000000',
                                            backgroundColor: active ? "#222" : undefined,
                                            "&:hover": {
                                                color: "black !important",
                                            },


                                        };

                                },
                            }}>
                            <main>
                                <button onClick={() => collapseSidebar()}><BiExpand className='text-black mx-5 my-5' size={"18px"}></BiExpand></button>
                            </main>
                            <MenuItem component={<Link to="/" />} onClick={dashboardHandler}> <FaHome className='inline mr-3 ' size={"18px"} ></FaHome > <span className='text-sm'>Dashboard</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={adminRegHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>Registration</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={noticeHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>Notice</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={discoverHandler}> <RiCompassDiscoverLine className='inline mr-3 ' size={"18px"}></RiCompassDiscoverLine> <span className='text-sm'>Discover</span></MenuItem>
                            {/* <MenuItem component={<Link to="/" />} onClick={certificaterHandler}> <FaCertificate className='inline mr-3 ' size={"18px"}></FaCertificate > <span className='text-sm'>Certificate</span></MenuItem> */}
                            <MenuItem component={<Link to="/" />} onClick={guidenceHandler}> <RiGuideLine className='inline mr-3 ' size={"18px"}></RiGuideLine > <span className='text-sm'>Gudience</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={adminBudgetHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>Budget </span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={adminKpiHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>KPI</span></MenuItem>
                        </Menu>
                    </Sidebar>
                </div>
            </div>
            <div className='w-full'>
                {
                    dashboard && <AdminDashboard></AdminDashboard>
                }
                {
                    adminReg && <AdminRegistration></AdminRegistration>
                }
                {
                    notice && <AdminNotice></AdminNotice>
                }
                {
                    discover && <AdminDiscover></AdminDiscover>
                }
                {/* {
                    certificate && <AdminCertificate></AdminCertificate>
                } */}
                {
                    guidence && <AdminGuidance></AdminGuidance>
                }
                {
                    adminBudget && <AdminBudget></AdminBudget>
                }
                {
                    adminKpi && <AdminKpi></AdminKpi>
                }
            </div>

        </div>
    );
};

export default AdminPanel;