<template>
  <div>Cart Quantity {{ productCount }}</div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    products: Array
  },
  computed: {
    productCount() {
      return this.products.length;
    }
  },
  watch: {
    productCount() {
      console.log(this.products);
    }
  }
};
</script>

<style scoped></style>
