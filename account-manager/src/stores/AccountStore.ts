import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import {data} from '../data/data';

export interface Account {
  id?: string
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  editMode: boolean;
}

class AccountStore {
  accounts: Account[] = [];
  loading: boolean = false;
  error: string | null = null;
  editMode: string | null = null;
  formData: Account | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch accounts from the API
  async fetchAccounts() {
    this.loading = true;
    try {
      const response = await axios.get<Account[]>('http://localhost:8089/api/accounts');
      this.accounts = response.data ? response.data : data;
    } catch (error) {
      this.error = 'Failed to fetch data';
    } finally {
      this.loading = false;
    }
  }

  // Edit an account's details
  setEditMode(account: Account) {
    this.formData = { ...account }; // Ensure formData is a copy of the account
    this.editMode = account.firstName; // Set the edit mode to this specific account
  }

  // Handle changes in the edit form
  handleChange<K extends keyof Account>(name: K, value: Account[K]) {
    if (this.formData) {
      this.formData[name] = value;
    }
  }

  // Save the edited account
  saveEditedAccount() {
    if (this.formData) {
      if (this.formData) {
        this.accounts = this.accounts.map((account) =>
          account.firstName === this.formData!.firstName ? this.formData! : account
        );
      }
      this.editMode = null; // Close the edit mode after saving
    }
  }

  // Sort accounts by date of birth (DOB)
  get sortedAccounts() {
    return [...this.accounts].sort((a, b) => new Date(b.dob).getTime() - new Date(a.dob).getTime());
  }
}

const accountStore = new AccountStore();
export default accountStore;
