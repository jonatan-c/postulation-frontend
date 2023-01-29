import React from 'react';
import { TableHeaderFilter } from './TableHeaderFilter';

import { TableFooter } from './TableFooter';
import { TableBody } from './TableBody';

export const TableComponent = (): any => {
	return (
		<>
			{/* <div className='border rounded-2xl'> */}

			<TableHeaderFilter />
			<TableBody />
			<TableFooter />
			{/* </div> */}
		</>
	);
};
