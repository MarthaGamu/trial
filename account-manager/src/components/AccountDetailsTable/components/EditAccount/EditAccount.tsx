import React, { useState, useEffect } from 'react';
import axios from 'axios';
import accountStore, { Account } from '../../../../stores/AccountStore';

interface EditAccountProps {
	accountId: string;
	onClose: () => void; // Callback to close the Edit view
}

const EditAccount: React.FC<EditAccountProps> = ({ accountId, onClose }) => {
	const [formData, setFormData] = useState<Account | null>(null);
	console.log('Edit Account called');
	// Fetch the account details using the id
	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = accountStore.accounts.find(
					(acc) => acc.id === accountId
				);
				if (account) {
					setFormData({ ...account });
				} else {
					const response = await axios.get<Account>(
						`http://localhost:8089/api/accounts/${accountId}`
					);
					setFormData(response.data);
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
		setFormData({ ...formData, [e.target.name]: e.target.value } as Account);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (formData) {
				const response = await axios.put(
					`http://localhost:8089/api/accounts/${accountId}`,
					formData
				);
				console.log('Account updated successfully:', response.data);
				accountStore.accounts = accountStore.accounts.map((acc) =>
					acc.id === accountId ? { ...response.data } : acc
				);
				onClose(); // Close the Edit view after successful submission
			}
		} catch (error) {
			console.error('Error updating account:', error);
		}
	};

	if (!formData) {
		return <p>Loading...</p>;
	}

	return (
		<div className='p-4 bg-white shadow-lg rounded-lg'>
			<h2 className='text-xl font-bold text-center mb-4'>Edit Account</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-bold text-gray-700 mb-2'
					>
						Title
					</label>
					<select
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
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
						className='block text-sm font-bold text-gray-700 mb-2'
					>
						First Name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						value={formData.firstName}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='lastName'
						className='block text-sm font-bold text-gray-700 mb-2'
					>
						Last Name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						value={formData.lastName}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='dob'
						className='block text-sm font-bold text-gray-700 mb-2'
					>
						Date of Birth
					</label>
					<input
						id='dob'
						name='dob'
						type='date'
						value={formData.dob}
						onChange={handleChange}
						className='w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-500'
					/>
				</div>
				<div className='flex justify-between'>
					<button
						type='button'
						onClick={onClose}
						className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditAccount;
