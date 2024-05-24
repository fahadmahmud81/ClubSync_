import { format } from 'date-fns';
import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import EventsChild from './EventsChild';
import './NewsEvents.css'


const NewsEvents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const todayDate = new Date();
    const formateTodayDate = format(todayDate, 'PP')
    // for react-day-picker
    const date = format(selectedDate, 'PP');
    const dateNum = selectedDate.toLocaleDateString();
    const month = format(selectedDate, 'MMMM')
    const year = format(selectedDate, 'yyyy')
    const dateWithTime = format(selectedDate, 'PPpp')
    const dateNumber = parseInt(format(selectedDate, "d"))
    const monthNumber = parseInt(format(selectedDate, "M"))
    const yearNumber = parseInt(year)
    // console.log(dateNum)
    const { data: latestEvents = [], isLoading: eventsLoading, refetch: eventsRefetch } = useQuery({
        queryKey: ["latest_news_events", dateNum],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/latest_news_events?dateNum=${dateNum}`)
            const data = await res.json()
            return data
        }
    })
    // console.log(eventsLoading)
    return (
        <div>
            <div className='flex gap-10'>
                <div className='lg:p-10 bg-[#D2DDD4] stickyStyle h-screen'>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={data => {
                            if (data) {
                                setSelectedDate(data)
                            }
                        }}
                    />
                </div>
                <div className='lg:w-full'>
                    <div className='font-extrabold text-xl bg-[#D2DDD4] p-3'>
                        {/* <h1>Latest Events</h1> */}
                        {
                            formateTodayDate === date ?
                                <><h1>Latest Events</h1></> : <>
                                    <h1>Events On {date}</h1></>
                        }
                    </div>
                    <div className='py-5 '>
                        {
                            latestEvents.length > 0 ?
                                <>{
                                    latestEvents.map(data => <EventsChild
                                        key={data._id}
                                        data={data}
                                    ></EventsChild>)
                                }</> :
                                <>
                                    {
                                        eventsLoading ?
                                            <></> : <><div className='border border-[#D2DDD4] p-3 rounded-md bg-red-200'>
                                                <h1>❌ No Events  on {date}</h1>
                                            </div></>

                                    }

                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsEvents;