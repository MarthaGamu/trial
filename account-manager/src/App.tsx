import React from 'react';
import { ToastContainer } from 'react-toastify';

import AccountDetailsTable from './components/AccountDetailsTable/AccountDetailsTable';
import Footer from './components/Footer';
import AccountsSummary from './components/AccountDetailsTable/components/AccountsSummary';

const App: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex-grow bg-white'>
				<ToastContainer />
				<div className='container mx-auto p-4'>
					{/* Account Details Table */}
					<AccountDetailsTable />
					<AccountsSummary />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default App;
