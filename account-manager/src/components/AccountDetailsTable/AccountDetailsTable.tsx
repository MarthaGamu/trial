import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore, { Account } from '../../stores/AccountStore';
import FilterDropdown from './components/FilterDropDown';
import Search from './components/Search';
import AddAccount from './components/AddAccount';
import EditAccount from './components/EditAccount';
import DeleteNotication from './components/DeleteNotification';
import axios from 'axios';
import useFuseSearch from '../../hooks/useFuseSearch';
import AccountTable from './components/AccountTable';
import Modal from './components/Modal';
import { accountsTableColumns, rowsPerPage } from './constants';

const AccountDetailsTable: React.FC = observer(() => {
	const { accounts, loading, error, fetchAccounts } = accountStore;
	const [showAddAccount, setShowAddAccount] = useState(false);
	const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('Date of Birth');

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

	const fuseOptions = {
		keys: ['title', 'firstName', 'lastName'],
		threshold: 0.3,
		includeScore: true
	};

	const filteredAccounts = useFuseSearch(accounts, fuseOptions, searchQuery);

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

	const sortedAccounts = applyFilter(filteredAccounts, selectedFilter);

	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(sortedAccounts.length / rowsPerPage);

	const handleDelete = async (id: string) => {
		try {
			await axios.delete(`http://localhost:8089/api/accounts/${id}`);
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

	const handleFilterChange = (filter: string) => {
		setSelectedFilter(filter);
	};

	return (
		<main className='p-4 bg-white text-black rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4 space-x-4'>
				<h2 className='text-4xl pb-4 font-bold'>Account Details</h2>
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
					onClick={() => setShowAddAccount(true)}
				>
					Add Account
				</button>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{accounts.length === 0 && !loading && !error && <p>No accounts found.</p>}

			{sortedAccounts.length > 0 && !loading && !error && (
				<>
					<div className='flex items-center justify-between mb-4 space-x-4'>
						<FilterDropdown onFilterChange={handleFilterChange} />
						<Search onSearch={(query) => setSearchQuery(query)} />
					</div>

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
				</>
			)}

			{deleteId && (
				<DeleteNotication
					onClose={() => handleDelete(deleteId)}
					handleCancelDelete={handleCancelDelete}
				/>
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
	);
});

export default AccountDetailsTable;
