export default function Search() {
	return (
		<div className='flex items-center border border-gray-300 rounded px-3 py-2'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='w-5 h-5 text-gray-500 mr-2'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'
				/>
			</svg>
			<input
				type='text'
				placeholder='Search'
				className='flex-grow outline-none'
				// Add search logic here
			/>
		</div>
	);
}
