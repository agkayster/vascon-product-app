'use client';
import React, { useState, useEffect } from 'react';

const SolutionsComponent = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		let res = await fetch('http://localhost:5000/api/v1/products');
	// 		let data = await res.json();
	// 		console.log('get data =>', data);
	// 	};
	// 	fetchProducts();
	// }, []);

	return (
		<div className='w-screen h-[calc(100vh-12rem)] md:h-[calc(100vh-12rem)] overflow-x-scroll text-black bg-blue-100'>
			SolutionsComponent
		</div>
	);
};

export default SolutionsComponent;
