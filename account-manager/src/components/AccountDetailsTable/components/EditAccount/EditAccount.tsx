import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import accountStore, { Account } from '../../../../stores/AccountStore';

interface EditAccountProps {
	accountId: string;
	onClose: () => void;
}

const EditAccount: React.FC<EditAccountProps> = ({ accountId, onClose }) => {
	const [formData, setFormData] = useState<Account | null>(null);
	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await accountStore.getAccount(accountId);
				if (account) {
					setFormData(account);
				}
			} catch (error) {
				console.error('Error fetching account:', error);
			}
		};
		fetchAccount();
	}, [accountId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		console.log('[handleChange] form data:', formData);
		setFormData({ ...formData, [e.target.name]: e.target.value } as Account);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData) {
			await accountStore.editAccount(formData);
		}
		onClose();
	};

	if (!formData) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2 className='text-xl font-bold text-center mb-4 text-gray-300'>
				Edit Account
			</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-bold text-gray-300 mb-2'
					>
						Title
					</label>
					<select
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						className='w-full border text-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					>
						<option value='Mr.'>Mr.</option>
						<option value='Ms.'>Ms.</option>
						<option value='Dr.'>Dr.</option>
						<option value='Prof.'>Prof.</option>
					</select>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='firstName'
						className='block text-sm font-bold text-gray-300 mb-2'
					>
						First Name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						value={formData.firstName}
						onChange={handleChange}
						className='w-full text-gray-300 border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='lastName'
						className='block text-sm font-bold text-gray-300 mb-2'
					>
						Last Name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						value={formData.lastName}
						onChange={handleChange}
						className='w-full text-gray-300 border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='dob'
						className='block text-sm font-bold text-gray-300 mb-2'
					>
						Date of Birth
					</label>
					<input
						id='dob'
						name='dob'
						type='date'
						value={formData.dob}
						onChange={handleChange}
						className='w-full text-gray-300 border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>

				<div className='flex justify-between'>
					<button
						type='submit'
						className='px-4 py-2 text-white rounded-lg hover:bg-blue-600 inline-flex justify-center items-center cursor-pointer'
					>
						<FaSave className='w-4 h-4 mr-2' /> Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditAccount;
