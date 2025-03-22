import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange
}) => {
	const handlePrevPage = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	return (
		<div className='flex items-center justify-between mt-4'>
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className={`px-4 py-2 rounded inline-flex items-center ${
					currentPage === 1
						? 'bg-gray-300 text-gray-800 cursor-not-allowed'
						: 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
				}`}
			>
				<FaArrowLeft className='w-4 h-4 mr-2' /> {/* Previous icon */}
				<span>Previous</span> {/* Text */}
			</button>

			<span>
				Page {currentPage} of {totalPages}
			</span>

			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={`px-4 py-2 rounded inline-flex items-center ${
					currentPage === totalPages
						? 'bg-gray-300 text-gray-700 cursor-not-allowed'
						: 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
				}`}
			>
				<span>Next</span>
				<FaArrowRight className='w-4 h-4 ml-2' />
			</button>
		</div>
	);
};

export default Pagination;
