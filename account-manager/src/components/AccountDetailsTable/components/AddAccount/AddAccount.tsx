import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import accountStore from '../../../../stores/AccountStore';

const AddAccount = () => {
	const intialFormData = {
		firstName: '',
		lastName: '',
		title: '',
		dob: '',
		editMode: true
	};
	const [formData, setFormData] = useState(intialFormData);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log('Form Data being sent:', formData); // Log the form data for debugging

		try {
			// Send the formData without an id to the backend
			await accountStore.addAccount(formData);
			toast.success('Form data submitted successfully!'); // Show a success toast
		} catch (error) {
			toast.error('Error submitting form data!'); // Show an error toast
			// Log the error to understand what's happening
			console.error(
				'Error submitting form data:',
				error.response || error.message
			);
		}

		// Reset the form after submission
		setFormData(intialFormData);
	};

	return (
		<div className='rounded-lg shadow-lg'>
			<form onSubmit={handleSubmit}>
				{/* Title Dropdown */}
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-gray-300 text-sm font-bold mb-2'
					>
						Title <span className='text-red-500 text-lg'>*</span>
					</label>
					<select
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						className='block text-gray-300 text-sm font-bold mb-2'
					>
						First Name
						<span className='text-red-500 text-lg' text-lg>
							*
						</span>
					</label>
					<input
						id='firstName'
						type='text'
						name='firstName'
						placeholder='Enter First Name'
						value={formData.firstName}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Last Name Input */}
				<div className='mb-4'>
					<label
						htmlFor='lastName'
						className='block text-gray-300 text-sm font-bold mb-2'
					>
						Last Name<span className='text-red-500 text-lg'>*</span>
					</label>
					<input
						id='lastName'
						type='text'
						name='lastName'
						placeholder='Enter Last Name'
						value={formData.lastName}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Date of Birth Input */}
				<div className='mb-4'>
					<label
						htmlFor='dob'
						className='block text-gray-300 text-sm font-bold mb-2'
					>
						<span className='hidden sm:inline'>Date of Birth</span>
						<span className='inline sm:hidden'>DOB</span>
						<span className='text-red-500 text-lg'>*</span>
					</label>

					<input
						id='dob'
						type='date'
						name='dob'
						value={formData.dob}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<button
					type='submit'
					className='w-full px-4 py-2 text-white border border-blue-500 rounded-lg hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex justify-center items-center text-center cursor-pointer'
				>
					<FaPaperPlane className='w-4 h-4 mr-2' />
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddAccount;
