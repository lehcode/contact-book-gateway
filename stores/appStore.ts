import { defineStore } from "pinia";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones: string[];
}

export interface User {
  username: string;
  email: string;
  password: string;
}

interface AppStore {
  isReady: boolean;
  user: User | null;
  loading: boolean;
  contacts: Contact[];
}

export const appStore = defineStore("contacts-store", {
  state: (): AppStore => {
    return {
      isReady: false,
      user: null,
      loading: true,
      contacts: [],
    };
  },
  getters: {},
  actions: {},
});
