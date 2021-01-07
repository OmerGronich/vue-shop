<template>
  <nav class="product-filter">
    <h1>Shop</h1>
    <div class="sort">
      <div class="collection-sort">
        <label>Filter by:</label>
        <select @change="onCategorySelected">
          <option
            v-for="category in categories"
            :value="category"
            :key="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="collection-sort">
        <label>Sort by:</label>
        <select @change="onSortOptionSelected">
          <option v-for="sortOp in sortOptions" :value="sortOp" :key="sortOp">
            {{ sortOp }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {
    categories: Array,
    selectedCategory: String,
    sortOptions: Array,
    selectedSortOption: String
  },
  methods: {
    onCategorySelected({ target: { value: category } }) {
      this.$emit("categorySelected", category);
    },
    onSortOptionSelected({ target: { value: sortOption } }) {
      this.$emit("sortOptionSelected", sortOption);
    }
  }
};
</script>

<style scoped></style>
