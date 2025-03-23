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
  actions?: string;
}

class AccountStore {
  id: string
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
      this.error = 'Application failed to fetch data';
    } finally {
      this.loading = false;
    }
  } 
}

const accountStore = new AccountStore();
export default accountStore;
