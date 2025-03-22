import React from 'react';

const DeleteNotification = ({ handleCancelDelete, onClose }) => {
	return (
		<div className='fixed top-4 right-4 bg-red-500 text-white px-4 py-3 rounded-md shadow-lg flex items-center space-x-4'>
			{/* Icon */}
			{/* <span className='text-2xl'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</span> */}

			{/* Message */}
			<p className='text-sm font-semibold'>
				By clicking 'Delete', the account details will be permanently removed
				from the database.
			</p>

			{/* Close Button */}
			<button
				className='text-white hover:bg-red-600 px-2 py-1 rounded-md focus:outline-none cursor-pointer'
				onClick={onClose}
			>
				Proceed
			</button>
			<button
				className='text-white hover:bg-red-600 px-2 py-1 rounded-md focus:outline-none cursor-pointer'
				onClick={handleCancelDelete}
			>
				Cancel
			</button>
		</div>
	);
};

export default DeleteNotification;
