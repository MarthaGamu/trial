import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
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
			<div className='overflow-x-auto'>
				{' '}
				{/* Added this div to make the table scrollable */}
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
										className={`px-5 py-2.5 text-sm font-medium inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ${
											account.editMode === false
												? 'text-gray-400 cursor-not-allowed'
												: 'cursor-pointer text-blue-500 hover:text-blue-600'
										}`}
										onClick={() => account.id && onEdit(account.id)}
										disabled={account.editMode === false}
									>
										<FaEdit className='w-4 h-4 mr-2' /> {/* Edit icon */}
										<span>Edit</span> {/* Add text */}
									</button>
								</td>

								<td className='border border-gray-300 px-4 py-2 text-black'>
									<button
										className={`px-5 py-2.5 text-sm font-medium inline-flex items-center focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center ${
											account.editMode === false
												? 'text-gray-400 cursor-not-allowed'
												: 'cursor-pointer text-red-500 hover:text-red-600'
										}`}
										onClick={() => account.id && onDelete(account.id)}
										disabled={account.editMode === false}
									>
										<FaTrashAlt className='w-4 h-4 mr-2' /> {/* Delete icon */}
										<span>Delete</span> {/* Add text */}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</>
	);
};

export default AccountTable;
