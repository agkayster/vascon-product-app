'use client';
import React, { useState, useEffect } from 'react';
import AddProductsForm from '@/components/AddProductsForm';
import RegisterComponent from '../register/page';
import { useRouter } from 'next/navigation';

const AddProductsComponent = () => {
	const router = useRouter();
	const [role, setRole] = useState('');

	// retrieve token of authenticated user from localStorage
	useEffect(() => {
		// let tokenData;
		let roleData;

		if (typeof window !== 'undefined') {
			// tokenData = localStorage.getItem('token');
			roleData = localStorage.getItem('role');
		}
		// tokenData && setToken(JSON.parse(tokenData));
		roleData && setRole(JSON.parse(roleData));
	}, []);

	useEffect(() => {
		role !== 'seller' && router.push('/register');
	}, []);

	return (
		<>{role !== 'seller' ? <RegisterComponent /> : <AddProductsForm />}</>
	);
};

export default AddProductsComponent;
