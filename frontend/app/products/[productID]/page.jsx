'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import randImage from '../../../public/assets/random-image.jpg';
import { getFromLocalStorage } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SingleProductComponent = () => {
	const [users, setUsers] = useState(null);
	const [productData, setProductData] = useState(null);

	const router = useRouter();

	const params = useParams();

	const { productID } = params;

	const token = JSON.parse(getFromLocalStorage('token'));
	const loggedName = JSON.parse(getFromLocalStorage('user'));

	useEffect(() => {
		const getSingleProduct = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				};
				const res = await fetch(
					`http://localhost:5000/api/v1/products/${productID}`,
					{
						method: 'GET',
						headers,
					}
				);
				const data = await res.json();
				setProductData(data?.data);
				localStorage.setItem('productID', JSON.stringify(productID));
				localStorage.setItem('productData', JSON.stringify(data?.data));
			} catch (error) {
				console.log('get error for single product =>', error);
			}
		};
		getSingleProduct();
	}, [productID, token]);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const res = await fetch('http://localhost:5000/api/v1/users', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await res.json();
				setUsers(data?.data);
			} catch (error) {
				console.log('get error from users =>', error);
			}
		};
		getAllUsers();
	}, []);

	const handleProductDelete = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};
			const res = await fetch(
				`http://localhost:5000/api/v1/products/${productID}`,
				{
					method: 'DELETE',
					headers,
				}
			);

			const data = await res.json();

			data.success === true && router.push('/products');
		} catch (error) {
			console.log('get delete error =>', error);
		}
	};

	// filter to match username who created the product to the user who is logged in
	const getLoggedInUserDetails = users?.filter(
		({ username }) => username === loggedName
	);

	return (
		<div>
			<div className='w-full max-w-sm bg-white border border-blue-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<div className='flex items-center justify-start px-5 py-3'>
					<Image
						src={randImage}
						alt='random image'
						width={80}
						height={40}
						className='border rounded-lg'
					/>
				</div>
				<div className='px-5 pb-5'>
					<h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
						{productData?.productName}
					</h5>
					<h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
						available items: {productData?.amountAvailable}
					</h5>

					<div className='flex items-center mt-2.5 mb-5'>
						<div className='flex items-center space-x-1 rtl:space-x-reverse'>
							<svg
								className='w-4 h-4 text-yellow-300'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 22 20'>
								<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
							</svg>
							<svg
								className='w-4 h-4 text-yellow-300'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 22 20'>
								<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
							</svg>
							<svg
								className='w-4 h-4 text-yellow-300'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 22 20'>
								<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
							</svg>
							<svg
								className='w-4 h-4 text-yellow-300'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 22 20'>
								<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
							</svg>
							<svg
								className='w-4 h-4 text-gray-200 dark:text-gray-600'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 22 20'>
								<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
							</svg>
						</div>
						<span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
							5.0
						</span>
					</div>
					<div className='flex items-center justify-between'>
						<span className='text-3xl font-bold text-gray-900 dark:text-white'>
							${productData?.cost}
						</span>
						{getLoggedInUserDetails?.map(({ _id: userId }) => {
							if (userId === productData?.sellerID) {
								return (
									<div className='flex flex-row gap-2'>
										<button
											onClick={handleProductDelete}
											className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
											Delete Item
										</button>
										<Link
											href='/updateProducts'
											className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
											Update Item
										</Link>
									</div>
								);
							} else {
								null;
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleProductComponent;
