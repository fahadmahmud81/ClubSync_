import React from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import "./FloatingIcon.css";


const FloatingIcon = ({ onClick }) => {
    return (
        <div className="floating-icon" onClick={onClick}>
            <AiFillPrinter size={30} />
        </div>
    );
};

export default FloatingIcon;