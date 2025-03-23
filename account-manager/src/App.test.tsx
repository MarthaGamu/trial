import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the accountStore to simulate loading and error states
import accountStore from './stores/AccountStore'; // Import the module here to mock it
import React from 'react';
vi.mock('./stores/AccountStore', () => ({
	default: {
		loading: false,
		error: null,
		accounts: [
			{
				id: '1',
				firstName: 'John',
				lastName: 'Doe',
				dob: '1990-01-01',
				title: 'Mr.',
				editMode: false
			},
			{
				id: '2',
				firstName: 'Jane',
				lastName: 'Smith',
				dob: '1985-05-15',
				title: 'Ms.',
				editMode: false
			}
		],
		fetchAccounts: vi.fn()
	}
}));

describe('App Component', () => {
	it('renders the loading state', async () => {
		// Mock loading state
		accountStore.loading = true;
		accountStore.error = null;

		render(<App />);

		// Ensure loading message is rendered
		const loadingMessage = screen.getByText(/Loading.../i);
		expect(loadingMessage).toBeInTheDocument();
	});

	it('renders the error message when there is an error', async () => {
		// Mock error state
		accountStore.loading = false;
		accountStore.error = 'Failed to fetch accounts';

		render(<App />);

		// Ensure all error messages are rendered (if there are multiple)
		const errorMessages = screen.getByText(/Failed to fetch accounts/i);
		expect(errorMessages).toBeInTheDocument(); // Check at least one is rendered
	});

	it('renders AccountDetailsTable when accounts are loaded successfully', async () => {
		// Mock successful state
		accountStore.loading = false;
		accountStore.error = null;
		accountStore.fetchAccounts = vi.fn().mockResolvedValueOnce(true); // Mock successful fetch

		render(<App />);

		// Wait for AccountDetailsTable to render
		await waitFor(() => {
			const table = screen.getByText('Date of Birth');
			expect(table).toBeInTheDocument();
		});
	});
});
