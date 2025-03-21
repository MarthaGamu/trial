import { useState } from 'react';
import axios from 'axios';

const AddAccount = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		title: '',
		dob: ''
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Form Data', formData);
		try {
			const response = await axios.post(
				'http://localhost:8089/api/accounts',
				formData,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			console.log('response.data', response.data);
			console.log('Form data submitted successfully', response.data);
		} catch (error) {
			console.error('Error submitting form data:', error);
		}

		setFormData({ firstName: '', lastName: '', title: '', dob: '' });
	};

	return (
		<div className='container mx-auto p-4 max-w-md bg-white rounded-lg shadow-lg'>
			<form onSubmit={handleSubmit}>
				{/* Title Dropdown */}
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Title
					</label>
					<select
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option value='' disabled>
							Select Title
						</option>
						<option value='Mr.'>Mr.</option>
						<option value='Ms.'>Ms.</option>
						<option value='Dr.'>Dr.</option>
						<option value='Prof.'>Prof.</option>
					</select>
				</div>

				{/* First Name Input */}
				<div className='mb-4'>
					<label
						htmlFor='firstName'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						First Name
					</label>
					<input
						id='firstName'
						type='text'
						name='firstName'
						placeholder='Enter First Name'
						value={formData.firstName}
						onChange={handleChange}
						className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Last Name Input */}
				<div className='mb-4'>
					<label
						htmlFor='lastName'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Last Name
					</label>
					<input
						id='lastName'
						type='text'
						name='lastName'
						placeholder='Enter Last Name'
						value={formData.lastName}
						onChange={handleChange}
						className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Date of Birth Input */}
				<div className='mb-4'>
					<label
						htmlFor='dob'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Date of Birth
					</label>
					<input
						id='dob'
						type='date'
						name='dob'
						value={formData.dob}
						onChange={handleChange}
						className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddAccount;
