<template>
  <div class="product-card" v-if="product">
    <img :src="product.image" />
    <div class="product-info">
      <h5>{{ product.title }}</h5>
      <h6>{{ product.price }}$</h6>
    </div>
    <button @click="$emit('addedToCart', product)">Add to Cart</button>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Product",
  data() {
    return {
      loading: false,
      product: null
    };
  },
  async mounted() {
    try {
      this.loading = true;
      this.product = (
        await axios(
          `https://fakestoreapi.com/products/${this.$route.params.id}`
        )
      ).data;
      this.loading = false;

      if (!this.product) {
        await this.$router.push("/products/404");
      }
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style scoped></style>
