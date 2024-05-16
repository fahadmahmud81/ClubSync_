import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { BiExpand } from 'react-icons/bi';
import { FaCertificate, FaHome } from 'react-icons/fa';

import { RiCompassDiscoverLine, RiGuideLine } from 'react-icons/ri';
import Dashboard from './Dashboard/Dashboard';
import Discover from './Discover/Discover';
import Certificate from './Certificate/Certificate';
import Guidence from './Guidence/Guidence';


const StudentPanel = () => {
    const { collapseSidebar } = useProSidebar();
    const [dashboard, setDashboard] = useState(true)
    const [discover, setDiscover] = useState(false)
    const [certificate, setCertificate] = useState(false)
    const [guidence, setGuidence] = useState(false)
    const dashboardHandler = () => {
        setDashboard(true)
        setDiscover(false)
        setCertificate(false)
        setGuidence(false)
    }
    const discoverHandler = () => {
        setDashboard(false)
        setDiscover(true)
        setCertificate(false)
        setGuidence(false)
    }
    const certificaterHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(true)
        setGuidence(false)
    }
    const guidenceHandler = () => {
        setDashboard(false)
        setDiscover(false)
        setCertificate(false)
        setGuidence(true)
    }

    return (
        <div className='flex '>
            <div className='sticky top-0 z-40 h-screen  bg-[#FDFDFD]'>
                <div>
                    <Sidebar width="180px">
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
                            <MenuItem component={<Link to="/" />} onClick={discoverHandler}> <RiCompassDiscoverLine className='inline mr-3 ' size={"18px"}></RiCompassDiscoverLine> <span className='text-sm'>Discover</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={certificaterHandler}> <FaCertificate className='inline mr-3 ' size={"18px"}></FaCertificate > <span className='text-sm'>Certificate</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={guidenceHandler}> <RiGuideLine className='inline mr-3 ' size={"18px"}></RiGuideLine > <span className='text-sm'>Gudience</span></MenuItem>


                        </Menu>
                    </Sidebar>
                </div>
            </div>
            <div className='w-full'>
                {
                    dashboard && <Dashboard
                        discoverHandler={discoverHandler}></Dashboard>
                }
                {
                    discover && <Discover></Discover>
                }
                {
                    certificate && <Certificate></Certificate>
                }
                {
                    guidence && <Guidence></Guidence>
                }
            </div>

        </div>
    );
};

export default StudentPanel;
