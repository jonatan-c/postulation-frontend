/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getPostulationById } from '../../store/postulations/postulationSlice';
import moment from 'moment';
import ModalInfoPostulation from './ModalInfoPostulation';
import Link from 'next/link';

export const TableBody = (): any => {
	const [openDeactivateModal, setOpenDeactivateModal] =
		React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { data: postulations, meta } = useAppSelector(
		(state) => state.postulation
	);

	const handleGetIDPostulation = (id: number): any => {
		dispatch(getPostulationById(id));
	};

	// ME DEJA PORQUE LAS VARIABLES APUNTAN A UN STATE
	// useEffect(() => {
	// dispatch(getAllPostulations( take , page));
	// }, [take,page])

	return (
		<>
			<div className="scroll-custom relative  overflow-x-auto">
				<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
						<tr className="bg-gray-300">
							<th scope="col" className="px-6 py-3  ">
								Name Company
							</th>
							<th scope="col" className="px-6 py-3 ">
								Position
							</th>
							<th scope="col" className="w-[50px] px-6  py-3">
								Date postulation [DD/MM/YYYY]
							</th>
							<th
								scope="col"
								className="justify-center px-6   py-3 text-center "
							>
								Status
							</th>
							<th scope="col" className="justify-center px-6 py-3 text-center">
								+ Info
							</th>
							<th scope="col" className="justify-center px-6 py-3 text-center">
								- Edit
							</th>
						</tr>
					</thead>
					<tbody className="">
						{postulations.map((postulation) => (
							<tr
								key={postulation?.id}
								className="h-8 border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
							>
								<td className="px-6 py-4">{postulation?.company}</td>
								<td className="px-6 py-4">Frontend</td>
								<td className="px-6 py-4">
									{moment(postulation?.dateSend).format('DD/MM/YYYY')}
								</td>
								<td className="flex justify-center px-6 py-4">
									<div className="flex items-center">
										<div
											className={` h-2.5 w-2.5 rounded-full ${
												postulation?.feedback ? 'bg-green-400' : 'bg-red-400'
											}  mr-2`}
										></div>{' '}
										{postulation?.feedback}
									</div>
								</td>
								<td className="justify-center px-6 py-4 text-center">
									<button
										onClick={() => {
											setOpenDeactivateModal(true);
											handleGetIDPostulation(postulation.id);
										}}
										type="button"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										+
									</button>
								</td>
								<td className="justify-center px-6 py-4 text-center">
									<button
										onClick={() => {
											// setOpenDeactivateModal(true);
											handleGetIDPostulation(postulation.id);
										}}
										type="button"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										<Link
											href={{
												pathname: '/dashboard/create-postulation',
											}}
										>
											-
										</Link>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* FOOTER */}

			{openDeactivateModal && (
				<ModalInfoPostulation setOpenDeactivateModal={setOpenDeactivateModal} />
			)}
		</>
	);
};
