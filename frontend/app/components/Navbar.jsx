import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Mobile from './Mobile';
import UserLinks from './Userlinks';

const Navbar = () => {
	return (
		<div className='h-12 text-blue-500 p-4 flex flex-row items-center justify-between border-b-2 border-b-blue-500 uppercase md:h-24 lg:px-10 xl:px-16'>
			{/* LEFT LINKS */}
			<div className='hidden md:flex gap-4 flex-1'>
				<Link href='/'>Home</Link>
				<Link href='/contact'>Contact</Link>
			</div>
			{/* LOGO */}
			<div className='text-lg font-semibold flex-none md:text-center'>
				<Link href='/'>Vascon</Link>
			</div>
			{/* MOBILE MENU */}
			<div className='md:hidden'>
				<Mobile />
			</div>
			{/* RIGHT LINKS */}
			<div className='hidden md:flex gap-4 items-center justify-end flex-1 md:relative'>
				<UserLinks />
			</div>
		</div>
	);
};

export default Navbar;
