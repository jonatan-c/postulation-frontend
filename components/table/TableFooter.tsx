import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAllPostulations } from '@/store/postulations/postulationSlice';
import React, { useEffect, useState } from 'react';

export const TableFooter = (): any => {
	const dispatch = useAppDispatch();
	const { meta } = useAppSelector((state) => state.postulation);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	return (
		<>
			<div className="flex items-center  justify-center border-t border-gray-200 bg-white px-4 py-3  ">
				<div className="flex flex-col text-center sm:flex sm:flex-1 sm:items-center sm:justify-between lg:flex-row">
					<div className="pb-3 lg:pb-0">
						<p className="text-sm text-gray-700">
							Showing page
							<span className="px-2 font-medium">{meta.page}</span>
							of
							<span className="px-2 font-medium">{meta.pageCount}</span>, Total
							results :
							<span className="px-2 font-medium">{meta.itemCount}</span>
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
		</>
	);
};
