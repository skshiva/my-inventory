<template>
  <VDialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        color="primary"
      >
        Add Item
      </VBtn>
    </template>
    <VCard>
      <VCardTitle>Add New Item</VCardTitle>
      <VCardText>
        <VForm
          ref="form"
          v-model="valid"
        >
          <VTextField
            v-model="item.name"
            label="Name"
            :rules="[v => !!v || 'Name is required']"
            required
          />
          <VTextField
            v-model="item.description"
            label="Description"
            :rules="[v => !!v || 'Description is required']"
            required
          />
          <VTextField
            v-model="item.price"
            label="Price"
            type="number"
            :rules="[v => v > 0 || 'Price must be positive']"
            required
          />
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn
          :disabled="!valid"
          color="green"
          @click="submit"
        >
          Add
        </VBtn>
        <VBtn
          color="red"
          @click="closeDialog"
        >
          Cancel
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';

const dialog = ref(false);
const item = ref({ name: '', description: '', price: '' });
const valid = ref(false);
const store = useInventoryStore();
const emit = defineEmits(['close']);

const resetForm = () => {
  item.value = { name: '', description: '', price: '' };
  valid.value = false;
};

const submit = async () => {
  try {
    await store.addItem(item.value);
    resetForm();
    emit('close');
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

const closeDialog = () => {
  resetForm();
  emit('close');
};
</script>
