import React, { useState } from 'react';
import left from './assets/left.png';
import logo from './assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the bars icon

const NavHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className='flex justify-between gap-1 dark:bg-gray-900'>
        <div className="w-3/12 p-2 m-5">
          <img src={left} alt="leftImg" />
        </div>

        <div className="w-3/12 p-2 self-center">
          <img src={logo} alt="logo" />
        </div>
        
        <button className='m-5 h-12 w-12 flex items-center justify-center rounded-full bg-na dark:bg-gray-900 text-white' onClick={toggleDrawer}>
  <FontAwesomeIcon icon={faBars} size="2x" /> 
</button>

      </nav>

      {drawerOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
    <div className="absolute top-0 left-0 h-full bg-white w-64 shadow z-50">
      <button className="absolute top-2 right-2" onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <ul className='flex flex-col items-start p-4'>
        <li className='text-gray-800 py-2'><a href='#'>Home</a></li>
        <li className='text-gray-800 py-2'><a href='#'>About</a></li>
        <li className='text-gray-800 py-2'><a href='#'>Services</a></li>
        <li className='text-gray-800 py-2'><a href='#'>Contact</a></li>
      </ul>
    </div>
  </div>
)}
 
 <div className="imageSlider">
  
 </div>



    </>
  );
};

export default NavHome;
