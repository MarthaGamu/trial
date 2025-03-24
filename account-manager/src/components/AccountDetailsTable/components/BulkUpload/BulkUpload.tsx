import Papa from 'papaparse';
import accountStore from '../../../../stores/AccountStore';
import { toast } from 'react-toastify';

const BulkUpload = () => {
	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: async (result) => {
					const accounts = result.data;

					try {
						// Use Promise.all to add all accounts in parallel for performance
						await Promise.all(
							accounts.map(async (account) => {
								await accountStore.addAccount({
									...account,
									editMode: Boolean(account.editMode)
								});
							})
						);

						toast.success('Accounts added successfully!');
					} catch (error) {
						console.error('Error adding accounts:', error);
						toast.error('Error adding accounts!');
					}
				},
				error: (error) => {
					console.error('Error parsing the CSV file:', error);
				}
			});
		}
	};

	return (
		<div className='col-span-6 mt-3 ml-3 flex items-center justify-center w-full'>
			<label
				htmlFor='csv-upload'
				className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:hover:border-gray-500'
			>
				<div className='flex flex-col items-center justify-center pt-5 pb-6 font-light'>
					<svg
						className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 16'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
						/>
					</svg>
					<p className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span> or drag and
						drop
					</p>
					<p className=' text-gray-500 dark:text-gray-400'>CSV files only</p>
				</div>
				<input
					id='csv-upload'
					type='file'
					className='hidden'
					accept='.csv'
					onChange={handleFileChange}
				/>
			</label>
		</div>
	);
};

export default BulkUpload;
