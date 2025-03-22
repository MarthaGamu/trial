import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore from '../../stores/AccountStore';
import FilterDropdown from './components/FilterDropDown';
import Search from './components/Search';
import Pagination from './components/Pagination';
import AddAccount from './components/AddAccount';
import EditAccount from './components/EditAccount';
import axios from 'axios';
import DeleteNotication from './components/DeleteNotification';

const AccountDetailsTable: React.FC = observer(() => {
	const { accounts, loading, error, fetchAccounts } = accountStore;
	const [showAddAccount, setShowAddAccount] = useState(false);
	const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	useEffect(() => {
		fetchAccounts();
	}, [fetchAccounts]);

	const handleEdit = (id: string) => {
		setCurrentAccountId(id);
	};

	const closeAddView = () => {
		setShowAddAccount(false);
	};

	const closeEditView = () => {
		setCurrentAccountId(null);
	};

	const rowsPerPage = 10; // Number of rows per page
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate total pages
	const totalPages = Math.ceil(accounts.length / rowsPerPage);

	// Paginated accounts for the current page
	const paginatedAccounts = accounts.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	const handleDelete = async (id: string) => {
		try {
			// Call the delete endpoint on the server
			await axios.delete(`http://localhost:8089/api/accounts/${id}`);
			// Remove the account from the store
			accountStore.accounts = accountStore.accounts.filter(
				(account) => account.id !== id
			);
			setDeleteId(null);
			console.log('Account deleted successfully');
		} catch (error) {
			console.error('Error deleting account:', error);
		}
	};

	const handleCancelDelete = () => {
		setDeleteId(null);
	};

	return (
		<main className='p-4 bg-white text-black rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4 space-x-4'>
				<h2 className='text-4xl pb-4 font-bold'>Account Details</h2>
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
					onClick={() => setShowAddAccount(true)}
				>
					Add Account
				</button>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{!loading && !error && accounts.length === 0 && <p>No accounts found.</p>}

			{!loading && accounts.length > 0 && (
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
								<th className='border border-gray-300 px-4 py-2 text-left text-black font-bold'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedAccounts.map((account) => (
								<>
									<tr key={account.id}>
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
												onClick={() => handleEdit(account.id)}
											>
												Edit
											</button>
										</td>
										<td className='border border-gray-300 px-4 py-2 text-black'>
											<button
												className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
												onClick={() => setDeleteId(account.id)}
											>
												Delete
											</button>
										</td>
									</tr>
								</>
							))}
						</tbody>
					</table>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</>
			)}
			{deleteId && (
				<DeleteNotication
					onClose={() => handleDelete(deleteId)}
					handleCancelDelete={handleCancelDelete}
				/>
			)}
			{/* Overlay for AddAccount */}
			{showAddAccount && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
					<div className='bg-white rounded-lg p-6 shadow-lg w-full max-w-md'>
						<AddAccount />
						<div className='mt-10'>
							<button
								className='mt-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
								onClick={closeAddView}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Overlay for EditAccount */}
			{currentAccountId && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
					<div className='bg-white rounded-lg p-6 shadow-lg w-full max-w-md'>
						<EditAccount accountId={currentAccountId} onClose={closeEditView} />
						<div className='mt-10'>
							<button
								className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
								onClick={closeEditView}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
});

export default AccountDetailsTable;
