import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import accountStore, { Account } from '../stores/AccountStore';
import AccountDetailsTable from '../components/AccountDetailsTable';

const AccountManager: React.FC = observer(() => {
	// Fetch accounts on mount
	useEffect(() => {
		accountStore.fetchAccounts();
	}, []);

	const { loading, error } = accountStore;

	return (
		<div className='container mx-auto p-4'>
			{loading && <div className='text-center'>Loading...</div>}
			{error && <div className='text-center text-red-500'>{error}</div>}

			<AccountDetailsTable />
		</div>
	);
});

export default AccountManager;
