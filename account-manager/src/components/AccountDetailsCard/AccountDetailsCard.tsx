import { Account } from '../AccountDetailsInterface';
export default function AccountDetailsCard({ account, handleEdit }: Account) {
	const { title, firstName, lastName, dob } = account;

	return (
		<div className='space-y-1'>
			<p className='font-semibold'>
				Name: {`${title} ${firstName} ${lastName}`}
			</p>
			<p>DOB: {new Date(dob).toLocaleDateString()}</p>
			<button
				onClick={() => handleEdit({ title, firstName, lastName, dob })}
				className='mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
			>
				Edit
			</button>
		</div>
	);
}
