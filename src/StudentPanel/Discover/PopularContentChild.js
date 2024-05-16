import React from 'react';
import { Link } from 'react-router-dom';

const PopularContentChild = ({ data }) => {
    const { videoLink, title, description, clubName, popularContent, publishedDate, publishedDateNum, exploreLink } = data
    const videoId = videoLink.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // console.log(exploreLink)
    return (
        <div className='bg-white rounded-2xl px-4 py-4 border'>
            <div className=''>
                <div className='rounded-xl overflow-hidden'>

                    <iframe
                        width="100%"
                        height="200"
                        src={embedUrl}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div>
                    <h1 className='font-semibold  text-[15px] pt-1'>{title}</h1>
                    <h1 className='text-sm pt-1 text-[#B4B6BF]'>{clubName}</h1>

                    <div className='pt-2'>
                        Date: {publishedDate}
                    </div>
                </div>
                <div className='pt-3 '>
                    <Link target="_blank" to={exploreLink} ><button className="border  w-full rounded-full py-1  hover:bg-[#2f3542] hover:duration-500 hover:text-white">Explore More</button></Link>
                </div>
            </div>

        </div >
    );
};

export default PopularContentChild;