<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>Edit Item</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="item.name" label="Name" required />
          <v-text-field v-model="item.description" label="Description" required />
          <v-text-field v-model="item.price" label="Price" type="number" required />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" :disabled="!valid" color="green">Save</v-btn>
        <v-btn @click="$emit('close')" color="red">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useInventoryStore } from '@/stores/inventory';

const store = useInventoryStore();

const item = ref({});
const valid = ref(false);

watch(() => props.item, (newValue) => {
  item.value = { ...newValue }; // Clone item to avoid direct mutations
});

const submit = () => {
  store.updateItem(item.value);
  $emit('close');
};
</script>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
