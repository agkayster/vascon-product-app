'use client';
import React, { useState, useContext, useEffect } from 'react';

const ProductsComponent = () => {
	const [products, setProducts] = useState(null);
	const [token, setToken] = useState('');

	useEffect(() => {
		let tokenData;

		if (typeof window !== 'undefined') {
			tokenData = localStorage.getItem('token');
		}
		tokenData && setToken(JSON.parse(tokenData));
	}, []);

	useEffect(() => {
		const getAllProducts = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				};
				const res = await fetch(
					'http://localhost:5000/api/v1/products',
					{
						method: 'GET',
						headers,
					}
				);
				const data = await res.json();
				console.log('get all products data =>', data);
				setProducts(data);
			} catch (error) {
				console.log('get error =>', error);
			}
		};
		getAllProducts();
	}, [token]);

	console.log('get products =>', products?.products);

	return (
		<div>
			<di>
				<h1>View All Products</h1>
			</di>
			<hr />
			<div>
				
			</div>
		</div>
	);
};

export default ProductsComponent;
