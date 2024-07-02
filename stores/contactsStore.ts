import { defineStore } from "pinia";
import type { Contact } from "~/stores/appStore";

export interface ContactState {
  contacts: Contact[];
  currentContact: Contact | null;
  error: string | null;
}

export const useContactStore = defineStore("contacts-store", {
  state: () =>
    <ContactState>{
      contacts: [],
      currentContact: null,
      error: null,
    },
  actions: {
    async fetchContacts() {
      this.error = null;
      try {
        const { data } = await useFetch("/api/contacts");
        this.contacts = data.value as Contact[];
      } catch (err) {
        this.error = "Failed to fetch contacts";
        console.error(err);
      }
    },
    async createContact(contact: Contact) {
      this.error = null;

      console.log(contact);

      try {
        const { data } = await useFetch("/api/contacts", {
          method: "POST",
          body: contact,
        });
        this.contacts.push(<Contact>data.value);
      } catch (err) {
        this.error = "Failed to create contact";
        console.error(err);
        throw err;
      }
    },
    async updateContact(contact: Contact) {
      this.error = null;
      try {
        const { data } = await useFetch(`/api/contacts/${contact.id}`, {
          method: "PUT",
          body: contact,
        });
        const index = this.contacts.findIndex((c) => c.id === contact.id);
        if (index !== -1) {
          this.contacts[index] = data.value as Contact;
        }
      } catch (err) {
        this.error = "Failed to update contact";
        console.error(err);
        throw err;
      }
    },
    async deleteContact(id: number) {
      this.error = null;
      try {
        await useFetch(`/api/contacts/${id}`, {
          method: "DELETE",
        });
        this.contacts = this.contacts.filter((c) => c.id !== id);
      } catch (err) {
        this.error = "Failed to delete contact";
        console.error(err);
        throw err;
      }
    },
  },
});
