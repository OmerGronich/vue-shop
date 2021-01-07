<template>
  <section class="products">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></ProductCard>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard";

export default {
  name: "ProductList",
  props: {
    products: Array
  },
  components: {
    ProductCard
  }
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
}
</style>
