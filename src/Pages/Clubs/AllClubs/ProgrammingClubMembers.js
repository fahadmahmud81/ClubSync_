import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const ProgrammingClubMembers = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1,// optional, default to 1.
            // partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const governingMembers = [
        {
            name: "Murad Hasan",
            title: "President",
            img: "https://i.ibb.co/kMhvPQD/murad-bhai-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "mdshafayethossain65df30@gmail.com"
        },
        {
            name: "Md. Abdul Halim Khan",
            title: "Vice President",
            img: "https://i.ibb.co/cLTbXnb/halim2-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Abdullah Raian",
            title: "Vice President",
            img: "https://i.ibb.co/rsNc8V6/raihan3.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Md. Zunead Abedin Eidmum",
            title: "General Secretary",
            img: "https://i.ibb.co/TMb8Zrk/eidmum-bhai-3.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Md. Fayazur Rahman",
            title: "Joint General Secretary",
            img: "https://i.ibb.co/C5W6xv2/F-F-0098-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Kayes Mohammad Abdullah",
            title: "Joint General Secretary",
            img: "https://i.ibb.co/K2Jw1gF/kayes-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Arafat Hossain",
            title: "Joint General Secretary",
            img: "https://i.ibb.co/hYZ4C5H/arafat-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Bakhtiar Muiz",
            title: "Financial Secretary",
            img: "https://i.ibb.co/WN9ZzJ2/muiz-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Md. Ayman Asif",
            title: "Senior Executive Member",
            img: "https://i.ibb.co/bWHSHw6/ayman-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "KM Bodruddoza",
            title: "Senior Executive Member",
            img: "https://i.ibb.co/5nwcMsh/KM-Turzo-Bhai-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Md. Sefat Khan",
            title: "Senior Executive Member",
            img: "https://i.ibb.co/zbSLYpH/sifat-bhai-1.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },

    ]
    const managingMembers = [
        {
            name: "Fahad Mahmud",
            title: "Organising Secretary",
            img: "https://i.ibb.co/KL6DWJq/MG-2363-01-03-small-2.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Tousif Mahmud Emon",
            title: "Organising Secretary",
            img: "https://i.ibb.co/dp8NWfH/IMG-20230220-194959-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Ali Mahmud Pritom",
            title: "Office Secretary",
            img: "https://i.ibb.co/Jzq1Z6G/IMG-20221118-224755-319-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: " Tasnima Hamid",
            title: "Office Secretary",
            img: "https://i.ibb.co/djmjPp9/Tasnima-Hamid-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Mohtamim Howlader",
            title: "Publication Secretary (In charge)",
            img: "https://i.ibb.co/hZVmCBj/69539577-2481932268687807-2468859167243239424-n.jpg",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Jul Jalal Al-Mamur Sayor",
            title: "Executive Member",
            img: "https://i.ibb.co/ys12Qcb/FB-IMG-1674452831818-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: " Md. Shahriar Hossain Opu",
            title: "Executive Member",
            img: "https://i.ibb.co/r3s8THj/222098894-1227255474359075-1461240915953120304-n-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Sabbir Ahmed",
            title: "Executive Member",
            img: "https://i.ibb.co/c3hSrgx/MG-8826-small-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },
        {
            name: "Md. Arifuzzaman Ripon",
            title: "Executive Member",
            img: "https://i.ibb.co/fqxVkP5/320693404-670664841221388-1561055033803101711-n-small.png",
            fbLink: "https://www.facebook.com/pc.bdu",
            linkedinLink: "https://www.facebook.com/pc.bdu",
            gmailAcc: "https://www.facebook.com/pc.bdu"
        },


    ]



    return (
        <div>
            <div className='text-center'>
                <h1 className='text-xl font-bold text-[#0A4644] tracking-widest lg:mb-7 mb-5'>Governing Members</h1>
                <Carousel
                    responsive={responsive}
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className='lg:-z-0'
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    slidesToSlide={1}
                    swipeable
                >
                    {
                        governingMembers.map((member) =>
                            <div className=' bg-[#F7F7F7]  py-5 rounded-3xl  mr-3'>
                                <div>
                                    <div className='flex justify-center'>
                                        <img className='h-36 w-36 rounded-full ' src={member.img} alt="" />
                                    </div>

                                    <div className='flex justify-center'>
                                        <div>
                                            <h1 className='font-bold text-sm text-[#0A4644] tracking-widest mt-2'>{member.name}</h1>
                                            <h1 className='text-sm tracking-wide'>{member.title}</h1>
                                        </div>
                                    </div>
                                    <div className='mt-5 flex justify-center gap-x-1 bg-white mx-14 rounded-2xl'>
                                        <Link to={member.fbLink} target='_blank' className='p-3 rounded-sm text-[#285DA1]   hover:duration-500 hover:cursor-pointer'>
                                            <FaFacebookF />
                                        </Link>
                                        <Link to={member.fbLink} target='_blank' className='p-3 rounded-sm text-[#0BACF4]  hover:duration-500 hover:cursor-pointer'>
                                            <FaLinkedin />
                                        </Link>
                                        <Link to={`mailto:${member.gmailAcc}`} target="_blank" className='p-3 rounded-sm text-[#D8163F]   hover:duration-500 hover:cursor-pointer'>
                                            <AiOutlineMail />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                </Carousel>
                <div>
                    <h1 className='text-xl font-bold text-[#0A4644] tracking-widest lg:my-7 my-5'>Managing Members</h1>
                    <Carousel
                        responsive={responsive}
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className='lg:-z-0'
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        slidesToSlide={1}
                        swipeable
                    >
                        {
                            managingMembers.map((member) =>
                                <div className=' bg-[#F7F7F7]  py-5 rounded-3xl  mr-3'>
                                    <div>
                                        <div className='flex justify-center'>
                                            <img className='h-36 w-36 rounded-full ' src={member.img} alt="" />
                                        </div>

                                        <div className='flex justify-center'>
                                            <div>
                                                <h1 className='font-bold text-sm text-[#0A4644] tracking-widest mt-2'>{member.name}</h1>
                                                <h1 className='text-sm tracking-wide'>{member.title}</h1>
                                            </div>
                                        </div>
                                        <div className='mt-5 flex justify-center gap-x-1 bg-white mx-14 rounded-3xl'>
                                            <Link to={member.fbLink} target='_blank' className='p-3 rounded-sm text-[#285DA1]   hover:duration-500 hover:cursor-pointer'>
                                                <FaFacebookF />
                                            </Link>
                                            <Link to={member.fbLink} target='_blank' className='p-3 rounded-sm text-[#0BACF4]  hover:duration-500 hover:cursor-pointer'>
                                                <FaLinkedin />
                                            </Link>
                                            <Link to={`mailto:${member.gmailAcc}`} target="_blank" className='p-3 rounded-sm text-[red]   hover:duration-500 hover:cursor-pointer'>
                                                <AiOutlineMail />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </Carousel>
                </div>
            </div>

        </div>
    );
};

export default ProgrammingClubMembers;
