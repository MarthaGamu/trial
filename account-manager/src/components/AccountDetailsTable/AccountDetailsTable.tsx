import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore, { Account } from '../../stores/AccountStore';
import FilterDropdown from './components/FilterDropDown';
import Search from './components/Search';
import Pagination from './components/Pagination';
import AddAccount from '../AddAccount';

const AccountDetailsTable: React.FC = observer(() => {
	const { accounts, loading, error, fetchAccounts, sortedAccounts } =
		accountStore;
	const [showAddAccount, setShowAddAccount] = useState(false);

	useEffect(() => {
		fetchAccounts();
	}, [fetchAccounts]);

	const rowsPerPage = 5; // Number of rows per page
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate total pages
	const totalPages = Math.ceil(accounts.length / rowsPerPage);

	// Paginated accounts for the current page
	const paginatedAccounts = accounts.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	return (
		<div className='p-4 bg-white text-black rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4 space-x-4'>
				<h1 className='text-lg font-bold'>
					{showAddAccount ? 'Adding new account' : 'Account Details'}{' '}
				</h1>
				{!showAddAccount && (
					<button
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						onClick={() => setShowAddAccount(true)}
					>
						Add Account
					</button>
				)}
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{!loading && !error && accounts.length === 0 && <p>No accounts found.</p>}

			{!loading && accounts.length > 0 && (
				<>
					{!showAddAccount && (
						<>
							<div className='flex items-center justify-between mb-4 space-x-4'>
								<FilterDropdown />
								<Search />
							</div>
							<table className='table-auto w-full border border-gray-300'>
								<thead>
									<tr>
										<th className='border border-gray-300 px-4 py-2 text-left text-black font-bold'>
											Title
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left text-black font-bold'>
											First Name
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left text-black font-bold'>
											Last Name
										</th>
										<th className='border border-gray-300 px-4 py-2 text-left text-black font-bold'>
											DOB
										</th>
									</tr>
								</thead>
								<tbody>
									{paginatedAccounts.map((account, index) => (
										<tr key={index}>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												{account.title}
											</td>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												{account.firstName}
											</td>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												{account.lastName}
											</td>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												{new Date(account.dob).toLocaleDateString()}
											</td>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												<button
													className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
													onClick={() => accountStore.setEditMode(account)}
												>
													Edit
												</button>
											</td>
											<td className='border border-gray-300 px-4 py-2 text-black'>
												<button
													className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
													onClick={() => {
														accountStore.accounts =
															accountStore.accounts.filter(
																(a) => a.firstName !== account.firstName
															);
													}}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								{/* Pagination */}
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={(page) => setCurrentPage(page)}
								/>
							</div>
						</>
					)}

					<div className='flex items-center justify-between mb-4 space-x-4'>
						{showAddAccount && <AddAccount />}
					</div>
				</>
			)}
		</div>
	);
});

export default AccountDetailsTable;
