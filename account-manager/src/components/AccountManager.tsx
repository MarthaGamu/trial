import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore, { Account } from '../stores/AccountStore';
import AccountDetailsCard from './AccountDetailsCard';

const AccountManager: React.FC = observer(() => {
	// Fetch accounts on mount
	useEffect(() => {
		accountStore.fetchAccounts();
	}, []);

	const { accounts, loading, error, editMode, formData, sortedAccounts } =
		accountStore;

	const handleEdit = (account: Account) => {
		accountStore.setEditMode(account);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		accountStore.handleChange(name as keyof Account, value);
	};

	const handleSave = () => {
		accountStore.saveEditedAccount();
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold text-center mb-6'>Account Manager</h1>

			{loading && <div className='text-center'>Loading...</div>}
			{error && <div className='text-center text-red-500'>{error}</div>}

			<div className='space-y-4'>
				{sortedAccounts.map((account) => (
					<div
						key={account.firstName}
						className='p-4 border rounded-lg shadow-sm bg-black flex justify-between items-center'
					>
						{editMode === account.firstName ? (
							<div className='flex flex-col space-y-2'>
								<input
									type='text'
									name='title'
									value={formData?.title || ''}
									onChange={handleChange}
									className='px-3 py-2 border border-gray-300 rounded'
									placeholder='Title'
								/>
								<input
									type='text'
									name='firstName'
									value={formData?.firstName || ''}
									onChange={handleChange}
									className='px-3 py-2 border border-gray-300 rounded'
									placeholder='First Name'
								/>
								<input
									type='text'
									name='lastName'
									value={formData?.lastName || ''}
									onChange={handleChange}
									className='px-3 py-2 border border-gray-300 rounded'
									placeholder='Last Name'
								/>
								<input
									type='date'
									name='dob'
									value={formData?.dob || ''}
									onChange={handleChange}
									className='px-3 py-2 border border-gray-300 rounded'
								/>
								<button
									onClick={handleSave}
									className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
								>
									Save
								</button>
							</div>
						) : (
							<div className='space-y-1'>
								<AccountDetailsCard account={account} handleEdit={handleEdit} />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
});

export default AccountManager;
