import React from 'react';

const Navbar = () => {
	return (
		<div className='text-dark border-b border-gray-400'>
			<div className='container mx-auto px-4'>
				<div className='py-4'>
					<nav className='flex items-center justify-center'>
						{/* Center Section */}
						<div className='flex justify-between items-center pr-8'>
							<h1 className='text-xl font-bold'>
								Account Management Application
							</h1>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
