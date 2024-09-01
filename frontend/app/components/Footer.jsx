import Link from 'next/link';

const Footer = () => {
	return (
		<div className='h-12 md:h-24 p-4 lg:px-10 xl:px-20 text-blue-500 flex items-center justify-between'>
			<Link href='/' className='font-bold text-lg uppercase'>
				vascon
			</Link>
			<p>©All rights reserved</p>
		</div>
	);
};

export default Footer;
