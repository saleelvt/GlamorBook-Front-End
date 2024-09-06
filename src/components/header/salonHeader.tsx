import React from 'react';
import '../../CSS/salonHeader.css'; // Add your custom styles here
import { useNavigate } from 'react-router-dom';

import { Button } from '@nextui-org/react';

const WelcomeHeader: React.FC = () => {
    const navigate = useNavigate()
    return (
        <header className="welcome-header bg-gradient-to-tr mt-10 from-pink-400  to-yellow-300">
            <h1 className='text-2xl'>Welcome to GlamorBook!</h1>
            <p>Your Salon's new Home for easy service management and booking..</p>
            <Button
            onClick={()=>{navigate('/salonSignUp')}}
            radius="full"
            className="bg-gradient-to-tr mt-10 from-pink-500  to-yellow-600 text-white shadow-lg rounded-md"
          >
           Contribute With us 
          </Button>
        </header>
    );
};

export default WelcomeHeader;
