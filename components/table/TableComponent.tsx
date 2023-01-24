import React from 'react';
import { TableBody } from './TableBody';
import { TableFilter } from './TableFilter';
import { TableFooter } from './TableFooter';
import { TableHead } from './TableHead';

export const TableComponent = (): any => {
	return (
		<>
			<TableFilter />
			<TableHead />
			<TableBody />
			<TableFooter />
		</>
	);
};
