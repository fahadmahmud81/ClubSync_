import React from 'react';
import { Hourglass } from 'react-loader-spinner';

const LoadingElement = () => {
    return (

        <div className='flex items-center justify-center min-h-screen'>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#0A4644', '#21D182']}
            />

        </div>
    );
};

export default LoadingElement;
