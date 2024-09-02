'use client';
import React, { useState, useEffect } from 'react';
import UpdateProductForm from '@/components/UpdateProductForm';

const UpdateSingleProduct = () => {
	const [token, setToken] = useState('');
	const [role, setRole] = useState('');

	useEffect(() => {
		let tokenData;
		let roleData;

		if (typeof window !== 'undefined') {
			tokenData = localStorage.getItem('token');
			roleData = localStorage.getItem('role');
		}
		tokenData && setToken(tokenData);
		roleData && setRole(roleData);
	}, [token, role]);

	return (
		<div>
			<UpdateProductForm />
		</div>
	);
};

export default UpdateSingleProduct;
