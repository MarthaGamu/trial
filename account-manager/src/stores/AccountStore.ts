import { makeAutoObservable, action, computed } from 'mobx';
import axios from 'axios';
import { data } from '../data/data';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../components/AccountDetailsTable/constants';

export interface Account {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  editMode: boolean;
  actions?: string;
}

class AccountStore {
  accounts: Account[] = [];
  loading: boolean = false;
  error: string | null = null;
  editMode: string | null = null;
  formData: Account | null = null;

  constructor() {
    makeAutoObservable(this, {
      // Binding actions
      fetchAccounts: action,
      editAccount: action,
      getAccount: action,
      deleteAccount: action,
      toggleEditMode: action,
      addAccount: action,
      setAccounts: action,
      // Binding computed properties
      totalAccounts: computed,
      isLoading: computed,
      numberOfDisabledAccounts: computed,
      numberOfActiveAccounts: computed,
    });
  }

  // Actions

  async fetchAccounts() {
    this.loading = true;
    try {
      const response = await axios.get<Account[]>(`${API_ENDPOINT}/accounts`);
      this.accounts = response.data ? response.data : data;
    } catch (error) {
      this.error = 'Application failed to fetch data';
      toast.error(this.error);
      console.error('Error fetching accounts:', error);
    } finally {
      this.loading = false;
    }
  }

  async editAccount(formData: Account) {
    try {
      const accountIndex = this.accounts.findIndex((acc) => acc.id === formData.id);
      if (accountIndex !== -1) {
        this.accounts[accountIndex] = { ...formData }; // Update local store
        await axios.put(`${API_ENDPOINT}/accounts/${formData.id}`, formData);
        toast.success('Account updated successfully!');
      } else {
        toast.error('Account not found!');
      }
    } catch (error) {
      console.error('Error editing account:', error);
      toast.error('Error updating account details!');
    }
  }

  async getAccount(accountId: string): Promise<Account | undefined> {
    try {
      const response = await axios.get<Account>(`${API_ENDPOINT}/accounts/${accountId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching account:', error);
      toast.error('Error fetching account details!');
      return undefined;
    }
  }

  async addAccount(account: Account) {
    try {
     const response =  await axios.post(
        `${API_ENDPOINT}/accounts`,
        account,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      this.accounts.push(response.data)
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('Error adding account!');
    }


    
  }
  async deleteAccount(accountId: string) {
    try {
      await axios.delete(`${API_ENDPOINT}/accounts/${accountId}`);
      this.accounts = this.accounts.filter((acc) => acc.id !== accountId); // Remove locally
      toast.success('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error deleting account!');
    }
  }

  toggleEditMode(accountId: string) {
    const account = this.accounts.find((acc) => acc.id === accountId);
    if (account) {
      account.editMode = !account.editMode; // Toggle editMode
    } else {
      toast.error('Account not found!');
    }
  }

  setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

  // Computed Properties

  get totalAccounts(): number {
    return this.accounts.length; // Returns the total number of accounts
  }

  get isLoading(): boolean {
    return this.loading; // Returns the current loading state
  }

  get numberOfActiveAccounts(): number {
    return this.accounts.filter((acc) => acc.editMode).length; // Returns the number of accounts in edit mode
  }

  get numberOfDisabledAccounts(): number {
    return this.accounts.filter((acc) => !acc.editMode).length; // Returns the number of accounts not
  }

  
}

const accountStore = new AccountStore();
export default accountStore;
