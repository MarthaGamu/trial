import React, { ChangeEvent } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import accountStore, { Account } from '../../../../stores/AccountStore';

const BulkUpload: React.FC = () => {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const file = event.target.files?.[0];

		if (file) {
			Papa.parse<Account>(file, {
				header: true,
				skipEmptyLines: true,
				complete: async (result: ParseResult<Account>) => {
					const accounts = result.data;

					try {
						// Add accounts in parallel using Promise.all
						await Promise.all(
							accounts.map(async (account) => {
								const editMode =
									(account.editMode as unknown as string).toLowerCase() ===
									'true';
								await accountStore.addAccount({
									...account,
									editMode
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
					toast.error('Error parsing the CSV file!');
				}
			});

			// Clear the file input value
			event.target.value = '';
		}
	};

	return (
		<div className='col-span-6 mt-3 ml-3 flex items-center justify-center w-full'>
			<label
				htmlFor='csv-upload'
				className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-400 dark:hover:border-gray-500'
			>
				<div className='flex flex-col items-center justify-center pt-5 pb-6 font-light'>
					<FaCloudUploadAlt className='w-12 h-12 mb-4 text-gray-400' />
					<p className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span> or drag and
						drop
					</p>
					<p className='text-gray-500 dark:text-gray-400'>CSV files only</p>
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
