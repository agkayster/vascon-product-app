import AuthProvider from './Providers';
import { Ubuntu } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './globals.css';

const ubuntu = Ubuntu({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
});

export const metadata = {
	title: 'Vascon Product App',
	description: 'A products app',
};

export default function RootLayout({ children }) {
	// AuthProvider wraps all components that need access to authentication
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen ubuntu antialiased',
					ubuntu.className
				)}>
				<AuthProvider>
					<Navbar />
					{children}
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
