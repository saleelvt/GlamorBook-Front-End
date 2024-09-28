import React from 'react';
import '../../CSS/salonHeader.css'; // Add your custom styles here
import { useNavigate } from 'react-router-dom';

import { Button } from '@nextui-org/react';

const WelcomeHeader: React.FC = () => {
    const navigate = useNavigate()
    return (
        <header className="welcome-header mt-12 bg-gradient-to-b from-gray-100 via-gray-100 via-gray-200   to-green-900">
            <h1 className='text-2xl text-black'>Welcome to GlamorBook!</h1>
            <p className='text-black'>Your Salon's new Home for easy service management and booking..</p>
            <Button
            onClick={()=>{navigate('/salonSignUp')}}
            radius="full"
            className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg  mt-12 rounded-md"
          >
           Contribute With us 
          </Button>
        </header>
    );
};

export default WelcomeHeader;
