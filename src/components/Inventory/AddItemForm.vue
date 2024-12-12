<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary">Add Item</v-btn>
    </template>
    <v-card>
      <v-card-title>Add New Item</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="item.name" label="Name" required />
          <v-text-field v-model="item.description" label="Description" required />
          <v-text-field v-model="item.price" label="Price" type="number" required />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" :disabled="!valid" color="green">Add</v-btn>
        <v-btn @click="$emit('close')" color="red">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';

const store = useInventoryStore();

const item = ref({ name: '', description: '', price: '' });
const valid = ref(false);

const submit = () => {
  store.addItem(item.value);
  $emit('close');
};
</script>
