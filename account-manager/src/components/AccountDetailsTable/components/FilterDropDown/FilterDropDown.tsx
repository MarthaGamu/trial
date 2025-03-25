import React, { useState } from 'react';
import { FaFilter, FaChevronDown } from 'react-icons/fa';

const FilterDropdown: React.FC<{
	onFilterChange: (filter: string) => void;
	selectedFilter: string;
	setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onFilterChange, selectedFilter, setSelectedFilter }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);
	const handleFilterChange = (filter: string) => {
		setSelectedFilter(filter);
		setIsOpen(false);
		onFilterChange(filter);
	};

	return (
		<div className='relative inline-block'>
			<button
				id='dropdownRadioButton'
				onClick={toggleDropdown}
				className='inline-flex items-center text-dark border focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-3 py-1.5  border-gray-800 focus:ring-gray-700'
				type='button'
			>
				<FaFilter className='w-4 h-4 text-dark mr-2' />
				<span className='hidden sm:inline'>Date of Birth</span>
				<span className='inline sm:hidden'>DOB</span>
				<FaChevronDown className='ml-2' />
			</button>

			{isOpen && (
				<div className='z-10 absolute w-48 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 mt-2'>
					<ul className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'>
						{['Youngest', 'Oldest'].map((filter) => (
							<li key={filter}>
								<div
									className='flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
									onClick={() => handleFilterChange(filter)}
								>
									<input
										id={`filter-${filter}`}
										type='radio'
										value={filter}
										checked={selectedFilter === filter}
										readOnly
										className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
									/>
									<label
										htmlFor={`filter-${filter}`}
										className='w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
									>
										{filter}
									</label>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default FilterDropdown;
