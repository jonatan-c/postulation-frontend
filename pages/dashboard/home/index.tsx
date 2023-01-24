import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const HomePage = (): any => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/auth/login');
		}
	}, []);

	return (
		<>
			<DashboardLayout>
				<h1>Home</h1>
			</DashboardLayout>
		</>
	);
};

export default HomePage;
