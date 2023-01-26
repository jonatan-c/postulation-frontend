/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Cookies from 'js-cookie';

import { cleanSelectedPostulation } from '@/store/postulations/postulationSlice';

export const Sidebar = (): any => {
	const { user } = useAppSelector((state) => state.authentication);
	const { selected } = useAppSelector((state) => state.postulation);

	const dispatch = useAppDispatch();

	const router = useRouter();

	const items = [
		{
			id: 1,
			name: 'Dashboard',
			href: '/dashboard/home',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			),
			status: false,
		},
		{
			id: 2,
			name: 'Users',
			href: '/dashboard/users',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},

		{
			id: 3,
			name: 'Postulations',
			href: '/dashboard/postulations',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
					/>
				</svg>
			),
			status: true,
		},
		{
			id: 4,
			name: `${
				router.pathname.split('/').pop() === 'postulations' || selected.id === 0
					? 'Create'
					: 'Edit'
			} Postulation`,
			href: '/dashboard/create-postulation',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
			),
			status: true,
		},
	];

	const logout = (): any => {
		Cookies.remove('token');
		router.push('/auth/login');
	};

	const activeByPage = (href: any): any => {
		if (href === router.pathname) {
			return 'bg-blue-500';
		} else {
			return 'hover:bg-gray-700';
		}
	};

	return (
		<>
			<h1 className="border-b-2 border-white pb-3 text-center text-2xl font-semibold">
				Postulation App
				<p>{user}</p>
			</h1>

			<ul className="mt-4">
				{items.map((item) => (
					<Link key={item.id} href={item.href}>
						<li
							className={`flex flex-row items-center rounded-lg p-2   ${activeByPage(
								item.href
							)}`}
						>
							<span className="material-icons mr-2">{item.icon}</span>
							<p>{item.name}</p>
							{item.status ? (
								<span className="ml-3 inline-flex items-center justify-center rounded-full bg-green-200 px-2 text-sm font-medium text-green-800 dark:bg-gray-700 dark:text-gray-300">
									Active
								</span>
							) : (
								<span className="ml-3 inline-flex items-center justify-center rounded-full bg-red-200 px-2 text-sm font-medium text-red-800 dark:bg-gray-700 dark:text-gray-300">
									Inactive
								</span>
							)}
						</li>
					</Link>
				))}
			</ul>

			{/* LOGOUT */}

			<button
				onClick={logout}
				className="absolute bottom-5 right-0 mt-4 flex w-full flex-row items-center rounded-lg p-2 hover:bg-gray-700 md:p-4 "
			>
				<span className="material-icons mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
				</span>
				<p>Logout</p>
			</button>
		</>
	);
};
