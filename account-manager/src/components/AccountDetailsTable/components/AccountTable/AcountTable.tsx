import React from 'react';
import { Account } from '../../../../stores/AccountStore';
import Pagination from '../Pagination';

interface AccountTableProps {
	accounts: Account[];
	columns: { label: string; accessor: keyof Account }[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	rowsPerPage: number;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const AccountTable: React.FC<AccountTableProps> = ({
	accounts,
	columns,
	onEdit,
	onDelete,
	rowsPerPage,
	currentPage,
	totalPages,
	onPageChange
}) => {
	const paginatedAccounts = accounts.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	return (
		<>
			<table className='table-auto w-full border border-gray-300'>
				<thead>
					<tr>
						{columns.slice(0, -1).map((column) => (
							<th
								key={column.label}
								className='border border-gray-300 px-4 py-2 text-left text-black font-bold'
							>
								{column.label}
							</th>
						))}
						<th
							colSpan={2}
							className='border border-gray-300 px-4 py-2 text-left text-black font-bold'
						>
							{columns[columns.length - 1].label}
						</th>
					</tr>
				</thead>
				<tbody>
					{paginatedAccounts.map((account: Account) => (
						<tr key={account.id}>
							{columns.slice(0, -1).map((column) => (
								<td
									key={column.label}
									className='border border-gray-300 px-4 py-2 text-black'
								>
									{column.accessor === 'dob'
										? new Date(account.dob).toLocaleDateString()
										: account[column.accessor]}
								</td>
							))}
							<td className='border border-gray-300 px-4 py-2 text-black'>
								<button
									className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
									onClick={() => onEdit(account.id)}
								>
									Edit
								</button>
							</td>
							<td className='border border-gray-300 px-4 py-2 text-black'>
								<button
									className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
									onClick={() => onDelete(account.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</>
	);
};

export default AccountTable;
