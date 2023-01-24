/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	getAllPostulations,
	getPostulationById,
} from '../../store/postulations/postulationSlice';
import moment from 'moment';
import ModalInfoPostulation from './ModalInfoPostulation';
import Link from 'next/link';

export const TableHead = (): any => {
	const [openDeactivateModal, setOpenDeactivateModal] =
		React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { data: postulations, meta } = useAppSelector(
		(state) => state.postulation
	);

	const [take, setTake] = useState(10);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getAllPostulations(take, page));
	}, [take, page]);

	const handleNext = (): any => {
		if (page === meta.pageCount) return;
		setPage(page + 1);
	};

	const handlePrev = (): any => {
		if (page === 1) return;
		setPage(page - 1);
	};

	const handleGetIDPostulation = (id: number): any => {
		dispatch(getPostulationById(id));
	};

	// ME DEJA PORQUE LAS VARIABLES APUNTAN A UN STATE
	// useEffect(() => {
	// dispatch(getAllPostulations( take , page));
	// }, [take,page])

	return (
		<>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Name Company
							</th>
							<th scope="col" className="px-6 py-3">
								Position
							</th>
							<th scope="col" className="px-6 py-3">
								Date postulation [DD/MM/YYYY]
							</th>
							<th scope="col" className="px-6 py-3">
								Status postulation Response?
							</th>
							<th scope="col" className="px-6 py-3">
								+ Info
							</th>
							<th scope="col" className="px-6 py-3">
								- Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Image
                  className="w-10 h-10 rounded-full"
                  src=""
                  alt="Jese image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">Neil Sims</div>
                  <div className="font-normal text-gray-500">
                    neil.sims@flowbite.com
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">React Developer</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                  Online
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  type="button"
                  data-modal-target="editUserModal"
                  data-modal-show="editUserModal"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr> */}

						{postulations.map((postulation) => (
							<tr
								key={postulation?.id}
								className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
							>
								<td className="px-6 py-4">{postulation?.company}</td>
								<td className="px-6 py-4">Frontend</td>
								<td className="px-6 py-4">
									{moment(postulation?.dateSend).format('DD/MM/YYYY')}
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center">
										<div
											className={` h-2.5 w-2.5 rounded-full ${
												postulation?.feedback ? 'bg-green-400' : 'bg-red-400'
											}  mr-2`}
										></div>{' '}
										{postulation?.feedback}
									</div>
								</td>
								<td className="px-6 py-4">
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
								<td className="px-6 py-4">
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
			<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
				<div className="flex flex-1 justify-between sm:hidden">
					<a
						href="#"
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Previous
					</a>
					<a
						href="#"
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Next
					</a>
				</div>
				<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-gray-700">
							Showing
							<span className="font-medium">{meta.page}</span>
							page
							<span className="font-medium">{meta.pageCount}</span>
							of
							<span className="font-medium">{meta.itemCount}</span>
							results
						</p>
					</div>
					<div>
						<nav
							className="isolate inline-flex -space-x-px rounded-md shadow-sm"
							aria-label="Pagination"
						>
							<button
								onClick={handlePrev}
								className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
							>
								<span className="sr-only">Previous</span>
								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							<a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								1
							</a>
							<a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								2
							</a>

							<span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
								...
							</span>
							<a className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">
								8
							</a>
							<a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								9
							</a>
							<a className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								10
							</a>
							<button
								onClick={handleNext}
								className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
							>
								<span className="sr-only">Next</span>

								<svg
									className="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</nav>
					</div>
				</div>
			</div>

			{openDeactivateModal && (
				<ModalInfoPostulation setOpenDeactivateModal={setOpenDeactivateModal} />
			)}
		</>
	);
};
