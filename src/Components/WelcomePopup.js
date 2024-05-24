import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const WelcomePopup = () => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000); // Change the duration as needed
        return () => clearTimeout(timer);
    }, []);
    return (
        <Popup open={open} onClose={() => setOpen(false)} position="right center">
            <div>Welcome to our website!</div>
        </Popup>
    );
};

export default WelcomePopup;
