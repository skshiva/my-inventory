<template>
  <VDataTable
    :items="items"
    :headers="headers"
    item-value="id"
    class="elevation-1"
  >
    <template #item.actions="{ item }">
      <VBtn
        icon
        aria-label="Edit Item"
        @click="editItem(item)"
      >
        <VIcon>mdi-pencil</VIcon>
      </VBtn>
      <VBtn
        icon
        aria-label="Delete Item"
        @click="deleteItem(item.id)"
      >
        <VIcon>mdi-delete</VIcon>
      </VBtn>
    </template>
  </VDataTable>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Licensed Frozen Hat",
          description: "Incidunt et magni est ut.",
          price: "170.00",
          quantity: 56840,
        },
        {
          id: 2,
          name: "Rustic Concrete Chicken",
          description: "Sint libero mollitia.",
          price: "302.00",
          quantity: 9358,
        },
        {
          id: 3,
          name: "Fantastic Metal Computer",
          description: "In consequuntur cupiditate et unde minus.",
          price: "279.00",
          quantity: 90316,
        },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    computedHeaders() {
      return this.headers;
    },
  },
  methods: {
    editItem(item) {
      console.log("Edit item:", item);
      this.$emit('edit', item);
    },
    deleteItem(itemId) {
      console.log("Delete item with ID:", itemId);
      this.$emit('delete', itemId);
    },
  },
};
</script>
