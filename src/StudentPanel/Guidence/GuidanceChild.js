import React from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FaMessage } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from 'react-icons/rx';

const GuidanceChild = ({ data, refetch, messageHandler }) => {
    const {
        _id, subject, type, discription, stdEmail, stdSession, stdDepartment, reply, requestDate, requestDateNum, clubName,
    } = data

    const guidanceDeleteHandler = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deleteGuidance?id=${_id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {

                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Something Went Wrong",
                            icon: "error"
                        });
                    })


            }
        });

    }
    const handleMessageClick = (guidanceData) => {
        messageHandler(guidanceData);
        document.getElementById('my_modal_1').showModal();

    };
    return (
        <div className='mb-5 flex justify-between bg-white  p-3 rounded-lg border'>
            <div className='flex w-[30%]'>
                <div className='flex items-center justify-center pl-2'>
                    <div>
                        <h1 className=' font-semibold'>{subject}</h1>
                        <h1 className='text-sm text-[#B4B6BF]'>{requestDate}</h1>
                    </div>
                </div>
            </div>
            <div className=' w-[20%]'>
                <h1>{type}</h1>
            </div>
            <div className=' w-[20%]'>
                <h1>{clubName}</h1>
            </div>
            <div>
                {
                    reply === "no" ? <button data-tip="Message not Sent yet" className='tooltip rounded-full  bg-warning p-2 '>
                        <RxCross2 className='text-white' />
                    </button> : <button data-tip="Message Sent" className='tooltip rounded-full  bg-green-500 p-2 '>
                        <TiTick className='text-white' />
                    </button>
                }
            </div>
            <div>
                <button onClick={() => handleMessageClick(data)} data-tip="Your Reply" className='tooltip rounded-full bg-[#3B82F6] p-2'>
                    <FaMessage className='text-white' />
                </button>

            </div>
            <div>
                <button data-tip="Delete This" onClick={() => guidanceDeleteHandler(_id)} className='rounded-full bg-red-500 p-2 tooltip'>
                    <MdDelete className='text-white' />
                </button>
            </div>



        </div>
    );
};

export default GuidanceChild;