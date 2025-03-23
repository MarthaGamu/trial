import React from 'react';
import { MdErrorOutline } from 'react-icons/md'; // For the warning icon
import { FaTrashAlt } from 'react-icons/fa'; // For the "Proceed" button icon
import { IoClose } from 'react-icons/io5'; // For the "Cancel" button icon

const DeleteNotification = ({ handleCancelDelete, onClose }) => {
	return (
		<div
			id='alert-additional-content-2'
			className='p-4 mb-12 text-red-800 border border-red-300 rounded-lg dark:text-red-400 dark:border-red-800'
			role='alert'
		>
			{/* Title with Icon */}
			<div className='flex items-center'>
				<MdErrorOutline className='shrink-0 w-5 h-5 me-2' aria-hidden='true' />
				<h3 className='text-lg font-medium'>Account Deletion Warning</h3>
			</div>

			{/* Message */}
			<div className='mt-2 mb-4 text-sm'>
				You are about to permanently delete this account. This action cannot be
				undone, and all associated data will be removed from the system. Please
				confirm your decision carefully before proceeding.
			</div>

			{/* Action Buttons */}
			<div className='flex gap-3'>
				<button
					type='button'
					onClick={onClose}
					className='text-white cursor-pointer bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
				>
					<FaTrashAlt className='me-2 w-3 h-3' aria-hidden='true' />
					Proceed
				</button>
				<button
					type='button'
					onClick={handleCancelDelete}
					className='text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 cursor-pointer dark:hover:text-white dark:focus:ring-red-800'
				>
					<IoClose className='me-2 w-4 h-4' aria-hidden='true' />
					Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteNotification;
