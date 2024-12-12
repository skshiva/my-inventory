<template>
  <VContainer>
    <VBreadcrumbs :items="breadItems">
      <template #divider>
        <VIcon icon="mdi-chevron-right" />
      </template>
    </VBreadcrumbs>
    <h1>Inventory Management</h1>
    <VBtn
      color="primary"
      class="mb-4"
      @click="showAddForm = true"
    >
      Add Item
    </VBtn>

    <AddItemForm
      v-if="showAddForm"
      @close="showAddForm = false"
    />

    <InventoryList
      :items="inventoryItems"
      @edit="editItem"
      @delete="deleteItem"
    />

    <ModifyItemForm
      v-if="showEditForm"
      :item="currentEditItem"
      @close="closeEditForm"
    />
  </VContainer>
</template>

<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import AddItemForm from '@/components/Inventory/AddItemForm.vue';
import ModifyItemForm from '@/components/Inventory/ModifyItemForm.vue';
import InventoryList from '@/components/Inventory/InventoryList.vue';

const store = useInventoryStore();
const inventoryItems = store.fetchItems();
const breadItems = [
        {
          title: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          title: 'Inventory Listing',
          disabled: true,
          href: '/admin/inventory',
        },
      ]
const showAddForm = ref(false);
const showEditForm = ref(false);
const currentEditItem = ref(null);

const editItem = (item) => {
  currentEditItem.value = item;
  showEditForm.value = true;
};

const deleteItem = (itemId) => {
  store.deleteItem(itemId);
};

const closeEditForm = () => {
  showEditForm.value = false;
  currentEditItem.value = null;
};
</script>
