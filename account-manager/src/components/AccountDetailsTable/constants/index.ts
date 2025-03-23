import { Account } from "../../../stores/AccountStore";

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8089/api';

export const adminEmail = 'martha.mandizvidza@gmail.com'
export const accountsTableColumns: { label: string; accessor: keyof Account }[] = [
    { label: 'Title', accessor: 'title' },
    { label: 'First Name', accessor: 'firstName' },
    { label: 'Last Name', accessor: 'lastName' },
    { label: 'DOB', accessor: 'dob' },
    { label: 'Actions', accessor: 'actions' }
];

export const rowsPerPage = 4;