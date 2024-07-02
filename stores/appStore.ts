import { defineStore } from "pinia";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

export interface Phone {
  id: number;
  number: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

interface AppStore {
  isReady: boolean;
  user: User | null;
  contacts: Contact[];
}

export const appStore = defineStore("contacts-store", {
  state: (): AppStore => {
    return {
      isReady: false,
      user: null,
      contacts: [],
    };
  },
  getters: {},
  actions: {},
});
