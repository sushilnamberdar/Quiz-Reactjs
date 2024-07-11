import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reload = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = () => {
    navigate('/');
  };

  // useEffect to handle navigation on component unmount (refresh/close)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = 'Changes you made may not be saved. Are you sure you want to leave?';
      event.preventDefault();
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleNavigation(); // Navigate when component unmounts (refresh/close)
    };
  }, [navigate]);

  return (
    <div>
      Loading...
    </div>
  );
};

export default Reload;
