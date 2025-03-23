import React from 'react';
import { ToastContainer } from 'react-toastify';

import AccountDetailsTable from './components/AccountDetailsTable/AccountDetailsTable';
import Footer from './components/Footer';

const App: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex-grow flex justify-center items-center bg-white'>
				<ToastContainer />
				<div className='container mx-auto p-4'>
					<AccountDetailsTable />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default App;
