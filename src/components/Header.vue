<template>
  <nav class="product-filter">
    <h1>Shop</h1>
    <div class="sort">
      <div class="collection-sort">
        <label>Price Range: {{ priceRange }}</label>
        <Slider v-model="priceRange" :max="maxPrice" />
      </div>

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
import Slider from "primevue/slider/Slider";

export default {
  name: "Header",
  props: {
    categories: Array,
    selectedCategory: String,
    sortOptions: Array,
    selectedSortOption: String,
    maxPrice: Number
  },
  data() {
    return {
      priceRange: this.maxPrice
    };
  },
  components: {
    Slider
  },
  methods: {
    onCategorySelected({ target: { value: category } }) {
      this.$emit("categorySelected", category);
    },
    onSortOptionSelected({ target: { value: sortOption } }) {
      this.$emit("sortOptionSelected", sortOption);
    }
  },
  watch: {
    priceRange(newPriceRange) {
      this.$emit("priceRangeChanged", newPriceRange);
    }
  }
};
</script>

<style scoped>
h1 {
  display: flex;
}

.collection-sort {
  flex: 1;
}
</style>
