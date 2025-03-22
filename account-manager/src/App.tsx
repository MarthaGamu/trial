import React, { useEffect } from 'react';
import accountStore from './stores/AccountStore';
import Navbar from './components/Navbar';
import AccountDetailsTable from './components/AccountDetailsTable/AccountDetailsTable';
import Footer from './components/Footer';

const App: React.FC = () => {
	// Fetch accounts on mount
	useEffect(() => {
		accountStore.fetchAccounts();
	}, []);

	const { loading, error } = accountStore;

	return (
		<div className='flex flex-col min-h-screen'>
			{/* <Navbar /> */}
			<div className='flex-grow flex justify-center items-center bg-white'>
				<div className='container mx-auto p-4'>
					{loading && <div className='text-center'>Loading...</div>}
					{error && <div className='text-center text-red-500'>{error}</div>}
					<AccountDetailsTable />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default App;
