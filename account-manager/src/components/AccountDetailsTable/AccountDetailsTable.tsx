import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore, { Account } from '../../stores/AccountStore';
import FilterDropdown from './components/FilterDropDown';
import Search from './components/Search';
import AddAccount from './components/AddAccount';
import EditAccount from './components/EditAccount';
import DeleteNotication from './components/DeleteNotification';
import fuseSearch from '../../helpers/fuseSearch';
import AccountTable from './components/AccountTable';
import Modal from './components/Modal';
import { accountsTableColumns, adminEmail, rowsPerPage } from './constants';
import { FaPlus } from 'react-icons/fa';

const AccountDetailsTable: React.FC = observer(() => {
	const { accounts, loading, error } = accountStore;
	const [showAddAccount, setShowAddAccount] = useState(false);
	const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('Date of Birth');

	useEffect(() => {
		accountStore.fetchAccounts();
	}, []);

	const handleEdit = (id: string) => {
		setCurrentAccountId(id);
	};

	const closeAddView = () => {
		setShowAddAccount(false);
	};

	const closeEditView = () => {
		setCurrentAccountId(null);
	};

	const fuseOptions = {
		keys: ['title', 'firstName', 'lastName'],
		threshold: 0.3,
		includeScore: true
	};

	const searchAccounts = fuseSearch(accounts, fuseOptions, searchQuery);

	const applyFilter = (accounts: Account[], filter: string) => {
		const accountsCopy = accounts.slice();
		if (filter === 'Youngest') {
			return accountsCopy.sort(
				(a, b) => new Date(b.dob).getTime() - new Date(a.dob).getTime()
			);
		} else if (filter === 'Oldest') {
			return accountsCopy.sort(
				(a, b) => new Date(a.dob).getTime() - new Date(b.dob).getTime()
			);
		}
		return accountsCopy;
	};

	const sortedAccounts = applyFilter(searchAccounts, selectedFilter);

	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(sortedAccounts.length / rowsPerPage);

	const handleDelete = async (id: string) => {
		try {
			await accountStore.deleteAccount(id);
			setDeleteId(null);
			console.log('Account deleted successfully');
		} catch (error) {
			console.error('Error deleting account:', error);
		}
	};

	const handleCancelDelete = () => {
		setDeleteId(null);
	};

	const handleFilterChange = (filter: string) => {
		setSelectedFilter(filter);
	};

	return (
		<>
			{deleteId && (
				<DeleteNotication
					onClose={() => handleDelete(deleteId)}
					handleCancelDelete={handleCancelDelete}
				/>
			)}
			<main className='p-4 bg-white text-black border rounded-lg shadow-lg'>
				<div className='flex items-end justify-between mb-4 space-x-4'>
					<h1 className='text-4xl pb-4 font-light'>Account Details</h1>

					<button
						className='px-5 py-2.5 text-sm font-medium inline-flex items-center text-dark focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center cursor-pointer'
						onClick={() => setShowAddAccount(true)}
					>
						<FaPlus className='w-4 h-4 mr-2' />
						<span>Add Account</span>
					</button>
				</div>

				{/* Conditional rendering for loading, error, or empty state */}
				{loading && <p>Loading...</p>}
				{error && (
					<>
						<p className='text-red-500 py-8'> {error}</p>
						<p className='text-lg'>
							You can email administrator for support:{' '}
							<span className='font-semibold'>{adminEmail}</span>
						</p>
					</>
				)}
				{accounts.length === 0 && !loading && !error && (
					<p>No accounts found.</p>
				)}

				{/* Filters and Search */}
				{!error && (
					<div className='flex items-center justify-between mb-4 space-x-4'>
						<FilterDropdown onFilterChange={handleFilterChange} />
						<Search
							onSearch={(query: React.SetStateAction<string>) =>
								setSearchQuery(query)
							}
						/>
					</div>
				)}

				{/* Account Table */}
				{sortedAccounts.length > 0 && !loading && !error && (
					<AccountTable
						accounts={sortedAccounts}
						columns={accountsTableColumns}
						onEdit={handleEdit}
						onDelete={setDeleteId}
						rowsPerPage={rowsPerPage}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				)}

				{/* If no accounts found */}
				{sortedAccounts.length === 0 && !error && (
					<p className='text-start text-lg font-semibold text-gray-800 py-4'>
						No accounts found. Try adjusting your filters or search terms.
					</p>
				)}

				{/* Modal for AddAccount */}
				<Modal isOpen={showAddAccount} onClose={closeAddView}>
					<AddAccount />
				</Modal>

				{/* Modal for EditAccount */}
				{currentAccountId && (
					<Modal isOpen={!!currentAccountId} onClose={closeEditView}>
						<EditAccount accountId={currentAccountId} onClose={closeEditView} />
					</Modal>
				)}
			</main>
		</>
	);
});

export default AccountDetailsTable;
