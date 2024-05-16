import React from 'react';
import { Link } from 'react-router-dom';
import ClubFirstPart from './ClubFirstPart';
import AllClubs from './AllClubs';


const Clubs = () => {
    return (
        <div>
            {/* 1st part */}
            <ClubFirstPart></ClubFirstPart>
            <AllClubs></AllClubs>
        </div>
    );
};

export default Clubs;