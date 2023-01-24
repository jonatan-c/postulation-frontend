import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { TableComponent } from '@/components/table/TableComponent';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PostulationsPage = (): any => {
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
				<TableComponent />
			</DashboardLayout>
		</>
	);
};

export default PostulationsPage;
