import React from 'react';
import AccountManager from './components/AccountManager';
import Navbar from './components/Navbar';

const App: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className='flex justify-center items-center h-screen'>
				<AccountManager />
			</div>
		</>
	);
};

export default App;
