import React from 'react';

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
				className={`px-4 py-2 rounded ${
					currentPage === 1
						? 'bg-gray-300 text-gray-800'
						: 'bg-blue-500 text-white hover:bg-blue-600'
				}`}
			>
				Previous
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={`px-4 py-2 rounded ${
					currentPage === totalPages
						? 'bg-gray-300 text-gray-700'
						: 'bg-blue-500 text-white hover:bg-blue-600'
				}`}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
