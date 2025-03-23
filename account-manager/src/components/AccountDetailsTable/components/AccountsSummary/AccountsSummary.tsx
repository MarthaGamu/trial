import { observer } from 'mobx-react-lite';
import accountStore from '../../../../stores/AccountStore';

const AccountsSummary = observer(() => {
	const {
		totalAccounts,
		numberOfDisabledAccounts,
		numberOfActiveAccounts // Fixed naming for consistency
	} = accountStore;

	console.log('AccountsSummary', AccountsSummary);

	return (
		<>
			<div className='max-w-md mt-3 p-4 border rounded-lg shadow-lg bg-white'>
				<h2 className='text-lg font-bold mb-4 text-gray-700'>
					Accounts Summary
				</h2>
				<table className='table-auto w-full border-collapse border border-gray-300'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='px-4 py-2 text-left text-gray-600 border-b'>
								Metric
							</th>
							<th className='px-4 py-2 text-left text-gray-600 border-b'>
								Value
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='px-4 py-2 text-gray-700 border-b'>
								Total Number of Accounts
							</td>
							<td className='px-4 py-2 text-gray-900 border-b'>
								{totalAccounts}
							</td>
						</tr>
						<tr>
							<td className='px-4 py-2 text-gray-700 border-b'>
								Number of Disabled Accounts
							</td>
							<td className='px-4 py-2 text-gray-900 border-b'>
								{numberOfDisabledAccounts}
							</td>
						</tr>
						<tr>
							<td className='px-4 py-2 text-gray-700'>
								Number of Active Accounts
							</td>
							<td className='px-4 py-2 text-gray-900'>
								{numberOfActiveAccounts}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
});

export default AccountsSummary;
