'use client'
import { useState } from 'react';


// Menu items
const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Blog', link: '/Blog' },
    { name: 'Casting', link: '/Casting' },
    { name: 'Contact', link: '/Contact' },
];

const OverlayMenu = () => {

    // State for hamburger menu active
    const [isActive, setIsActive] = useState(false);

    // Function to toggle hamburger menu
    const toggleHamburger = () => {
        setIsActive(!isActive);
    };


    return (
        <>
            {/* Overlay Menu */}
            <div className={`fixed z-50 inset-0 ${isActive ? 'block' : 'hidden'}`}>
                <div className="absolute inset-0 w-full h-full bg-black opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="overlay-menu-inner">
                        <ul className="overlay-menu-list">
                            {menuItems.map((item, index) => (
                                <li key={index} className="text-7xl text-center p-5 font-Works">
                                    <a href={item.link} className="text-white hover:text-gray-300">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


            {/* Logo */}
            <div className="flex justify-between items-center p-4 absolute w-full">
                <a href="/">
                    <img src="/Logo.png" alt="logo" className="w-[120px] z-30 cursor-pointer" />
                </a>

                {/* Button Menu */}
                <div className="z-50 mr-14">
                    <button onClick={toggleHamburger}>
                        <svg
                            className={`burger-btn ${isActive ? 'active' : ''}`}
                            width="40"
                            height="20"
                            viewBox="0 0 40 26"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect className="burger-btn--1" width="40" height="6" rx="3" ry="3" />
                            <rect className="burger-btn--2" width="40" height="6" y="10" rx="3" ry="3" />
                            <rect className="burger-btn--3" width="40" height="6" y="20" rx="3" ry="3" />
                        </svg>
                    </button>
                </div>
            </div>

        </>
    );
}

export { OverlayMenu }