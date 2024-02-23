import React from 'react';
import logo from './assets/logo.png'
const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 flex items-center">
                            <img src={logo} className="h-16 me-3" alt="NGO Logo" />
                            <a href="https://www.instagram.com/dharmveer_shambhuraje_shakha_?igsh=MWwwcGdrcmYwcndndA==" className='text-white text-sm'>Connect With Us</a>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">धर्मवीर संभाजी महाराज © 2023 <a href="#" className="hover:underline"></a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
