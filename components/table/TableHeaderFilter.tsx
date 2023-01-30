import React from 'react';

export const TableHeaderFilter = (): any => {
	return (
		<>
			<div className="flex items-center justify-between bg-white py-4 px-4 dark:bg-gray-800 ">
				<label htmlFor="table-search" className="sr-only">
					Search
				</label>
				<div className="relative ">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
						<svg
							className="h-5 w-5 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					<input
						type="text"
						id="table-search-users"
						className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
						placeholder="Search for users"
					/>
				</div>
			</div>
		</>
	);
};
