import React from 'react';
import programming from '../../Assets/clubs/programming.png';
import robotics from '../../Assets/clubs/robotics.png';
import stem from '../../Assets/clubs/stem.png';
import cultural from '../../Assets/clubs/cultural.png';
import sports from '../../Assets/clubs/sports.png';
import ProgrammingClub from './AllClubs/ProgrammingClub';
import { useState } from 'react';
import Steam from './AllClubs/Steam';
import './AllClubs.css'



const AllClubs = () => {
    const [IsProgramming, setProgramming] = useState(true);
    const [IsSteam, setSteam] = useState(false);
    const [IsRobotics, setRobotics] = useState(false);
    const [IsCultural, setCultural] = useState(false);
    const [IsSports, setSports] = useState(false);
    const programmingHandler = () => {
        setProgramming(true)
        setSteam(false)
    }
    const steamHandler = () => {
        setSteam(true)
        setProgramming(false)

    }
    const clubMenuHandler = (event) => {
        event.preventDefault();
        const clubName = event.target.value.trim();
        if (clubName === "ProgrammingClub") {
            programmingHandler()
        }
        if (clubName === "STEAMClub") {
            steamHandler()
        }

    }
    return (
        <div className='lg:my-12 my-4 lg:mx-14 mx-4'>
            <div className='text-center'>
                <h1 className='text-xl font-bold text-[#0A4644] tracking-widest'>BDU CLUBS LIST</h1>
                {/* <h1 className='pt-2 text-[22px]'>For teams who create training videos at scale</h1> */}
            </div>
            {/* carousel */}
            {/* for large  screen*/}
            <div className='lg:my-10 my-3 py-2 lg:flex justify-between px-2 font-semibold border border-[#E9ECF6] rounded-2xl  hidden'>
                {
                    IsProgramming ? <button onClick={programmingHandler} className='flex gap-x-3 
                    bg-[#D2DDD4] p-3 rounded-lg text-[#0A4644]'>
                        <img className='w-5 pt-[2px]' src={programming} alt="" />
                        <span>Programming Club</span>
                    </button> : <button onClick={programmingHandler} className='flex gap-x-3 hover:bg-[#ebefed] p-3 rounded-lg'>
                        <img className='w-5 pt-[2px]' src={programming} alt="" />
                        <span>Programming Club</span>
                    </button>

                }
                {
                    IsSteam ? <button onClick={steamHandler} className='flex gap-x-3 bg-[#D2DDD4] py-3 px-[52px] rounded-lg text-[#0A4644]'>
                        <img className='w-5 pt-[2px]' src={stem} alt="" />
                        <span>STEAM Club</span>
                    </button> : <button onClick={steamHandler} className='flex gap-x-3 hover:bg-[#ebefed] py-3 px-[52px] rounded-lg'>
                        <img className='w-5 pt-[2px]' src={stem} alt="" />
                        <span>STEAM Club</span>
                    </button>
                }
                <button className='flex gap-x-3 hover:bg-[#ebefed] py-3 px-[35px] rounded-lg'>
                    <img className='w-5 pt-[2px]' src={robotics} alt="" />
                    <span>Robotics Club</span>
                </button>
                <button className='flex gap-x-3 hover:bg-[#ebefed] py-3 px-[48px] rounded-lg'>
                    <img className='w-5 pt-[2px]' src={sports} alt="" />
                    <span>Sports Club</span>
                </button>
                <button className='flex gap-x-3 hover:bg-[#ebefed] py-3 px-[44px] rounded-lg'>
                    <img className='w-5 pt-[2px]' src={cultural} alt="" />
                    <span>Cultural Club</span>
                </button>

            </div>
            {/* for small screen */}
            <div className='lg:hidden block my-5 '>
                <select onChange={clubMenuHandler} name='stdBlood' className=" rounded-md w-full px-3 py-2 bg-white border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none ">
                    <option className="customOption" value='ProgrammingClub'>Programming Club</option>
                    <option className="customOption" value='STEAMClub'>STEAM Club</option>
                    <option className="customOption" value='RoboticsClub'>Robotics Club</option>
                    <option className="customOption" value='SportsClub'>Sports Club</option>
                    <option className="customOption" value='CulturalClub'>Cultural Club</option>
                </select>
            </div>

            <div>
                {
                    IsProgramming &&
                    <div>
                        <ProgrammingClub></ProgrammingClub>
                    </div>
                }
                {
                    IsSteam &&
                    <div>
                        <Steam></Steam>
                    </div>
                }
            </div>

        </div>
    );
};

export default AllClubs;