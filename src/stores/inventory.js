import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [], // Array to hold inventory items
    nextId: 1, // Mock for unique IDs
  }),
  actions: {
    addItem(item) {
      this.items.push({ id: this.nextId++, ...item });
    },
    updateItem(updatedItem) {
      const index = this.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) this.items[index] = updatedItem;
    },
    deleteItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
    fetchItems() {
      // Mock API fetch - replace with real API call if backend is available
      return this.items;
    },
  },
});
