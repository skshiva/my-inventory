<template>
  <VDialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <VCard>
      <VCardTitle>Edit Item</VCardTitle>
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
          Save
        </VBtn>
        <VBtn
          color="red"
          @click="cancel"
        >
          Cancel
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import { useInventoryStore } from '@/stores/inventory';

const store = useInventoryStore();
const emit = defineEmits(['close']);

const dialog = ref(false);
const item = ref({});
const valid = ref(false);

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({}), // Default empty object
  },
});

// Watch for changes in props.item and clone it to avoid direct mutation
watch(
  () => props.item,
  (newValue) => {
    item.value = { ...newValue };
  },
  { immediate: true }
);

const submit = async () => {
  try {
    await store.updateItem(item.value);
    resetForm();
    emit('close');
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

const cancel = () => {
  resetForm();
  emit('close');
};

const resetForm = () => {
  item.value = { ...props.item };
  valid.value = false;
};
</script>
