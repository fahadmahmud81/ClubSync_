import React, { useState } from 'react';
import { BiExpand } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import AdvisorSchedule from './AdvisorSchedule/AdvisorSchedule';
import AdvisorBudget from './AdvisorBudget/AdvisorBudget';
import AdvisorKpi from './AdvisorKpi/AdvisorKpi';

const AdvisorPanel = () => {
    const { collapseSidebar } = useProSidebar();
    const [schedule, setSchedule] = useState(true)
    const [budget, setbudget] = useState(false)
    const [advisorKpi, setAdvisorKpi] = useState(false)

    const scheduleHandler = () => {
        setSchedule(true)
        setbudget(false)
        setAdvisorKpi(false)

    }
    const budgetHandler = () => {
        setSchedule(false)
        setbudget(true)
        setAdvisorKpi(false)
    }
    const advisorKpiHandler = () => {
        setSchedule(false)
        setbudget(false)
        setAdvisorKpi(true)
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
                            <MenuItem component={<Link to="/" />} onClick={scheduleHandler}> <FaHome className='inline mr-3 ' size={"18px"} ></FaHome > <span className='text-sm'>Schedule</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={budgetHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>Budget</span></MenuItem>
                            <MenuItem component={<Link to="/" />} onClick={advisorKpiHandler}> <MdOutlineMessage className='inline mr-3 ' size={"18px"}></MdOutlineMessage > <span className='text-sm'>KPI</span></MenuItem>



                        </Menu>
                    </Sidebar>
                </div>
            </div>
            <div className='w-full'>
                {
                    schedule && <AdvisorSchedule></AdvisorSchedule>
                }
                {
                    budget && <AdvisorBudget></AdvisorBudget>
                }
                {
                    advisorKpi && <AdvisorKpi></AdvisorKpi>
                }

            </div>

        </div>
    );
};

export default AdvisorPanel;