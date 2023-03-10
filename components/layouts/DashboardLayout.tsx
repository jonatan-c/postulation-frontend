/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Sidebar } from '../sidebar/Sidebar';

interface Props {
	children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props): any => {
	const router = useRouter();

	const routePath = router.pathname.split('/').pop();

	return (
		<>
			<Head>
				<title>Postulation App</title>
				<meta name="description" content="Generated by Postulation App" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="flex h-[100vh] w-[100%]  flex-col md:w-[100%] lg:h-[100vh] lg:flex-row ">
					<div className="fixed z-30 block  w-[100%] bg-gray-800  p-4 text-white  md:p-4 lg:relative lg:z-0 lg:m-6 lg:block lg:w-[30%] lg:items-center lg:justify-between lg:rounded-lg ">
						<Sidebar />
					</div>
					<div
						className={`block ${
							routePath === 'create-postulation' ? 'h-fit' : 'h-full'
						}   bg-gray-800 p-4    pt-32 text-white  md:p-4 lg:relative lg:m-6 lg:block lg:h-[calc((100vh-48px))] lg:w-[70%] lg:items-center lg:justify-between lg:rounded-lg`}
					>
						{children}
					</div>
				</div>
			</main>
		</>
	);
};
