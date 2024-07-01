import { defineStore } from 'pinia'
import type { Contact } from '~/stores/piniaStore';

export interface ContactState {
  contacts: Contact[],
  currentContact: Contact | null,
  loading: boolean,
  error: string | null,
}

export const useContactStore = defineStore('contacts', {
  state: () => (<ContactState>{
    contacts: [],
    currentContact: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchContacts() {
      this.loading = true
      this.error = null
      try {
        const { data } = await useFetch('/api/contacts')
        this.contacts = data.value
      } catch (err) {
        this.error = 'Failed to fetch contacts'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async createContact(contact: Contact) {
      this.loading = true
      this.error = null
      try {
        const { data } = await useFetch('/api/contacts', {
          method: 'POST',
          body: contact,
        })
        this.contacts.push(data.value)
      } catch (err) {
        this.error = 'Failed to create contact'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },
    async updateContact(contact: Contact) {
      this.loading = true
      this.error = null
      try {
        const { data } = await useFetch(`/api/contacts/${contact.id}`, {
          method: 'PUT',
          body: contact,
        })
        const index = this.contacts.findIndex(c => c.id === contact.id)
        if (index !== -1) {
          this.contacts[index] = data.value
        }
      } catch (err) {
        this.error = 'Failed to update contact'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },
    async deleteContact(id: number) {
      this.loading = true
      this.error = null
      try {
        await useFetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        })
        this.contacts = this.contacts.filter(c => c.id !== id)
      } catch (err) {
        this.error = 'Failed to delete contact'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
