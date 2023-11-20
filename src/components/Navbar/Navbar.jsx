import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logoNav.png';
const Navbar = () => {
    return (
        <nav className="bg-[#e5e5e5] px-4">
            <div className='md:flex justify-between items-center'>
                {/* logo */}
                <a
                    href="https://joinwelead.org/"
                    className="flex flex-row items-center justify-center gap-2"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="hidden sm:block object-scale-down h-16  hover:scale-105 transition duration-500 ease-in-out"
                    />
                </a>

                {/* menu */}

                <div className='space-x-4'>
                    <Link to='https://www.joinwelead.org/el/blog' className='text-[#143727] hover:text-gray-300 p-2'>blog</Link>
                    <Link to='https://www.joinwelead.org/el/sxetika-me-emas' className='text-[#143727] hover:text-gray-300 p-2'>about us</Link>
                    <Link to='https://www.joinwelead.org/el/programmata' className='text-[#143727] hover:text-gray-300 p-2'>seminars</Link>
                    <Link to='/login' className='text-[#143727] hover:text-gray-300 p-2'><button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
                        Log in
                    </button>
                    </Link>
                    <Link to='/register' className='text-[#143727] hover:text-gray-300 p-2'><button className="bg-[#143727] text-[#e5e5e5] rounded-full px-4 py-2">
                        Register
                    </button></Link>
                </div>
            </div>



        </nav>
    );
};
export default Navbar;