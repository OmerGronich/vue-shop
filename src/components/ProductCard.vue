<template>
  <div class="product-card">
    <router-link :to="`/${product.id}`" class="product-image">
      <img :src="product.image" />
      <div>Go to Product</div>
    </router-link>
    <div class="product-info">
      <h5>{{ product.title }}</h5>
      <h6>
        <div :class="{ 'on-sale': product.onSale }">{{ product.price }}</div>
        <div v-if="product.onSale">
          {{
            product.onSale
              ? Math.floor(product.price - product.price * 0.15)
              : product.price
          }}$
        </div>
      </h6>
    </div>
    <button @click="$emit('addedToCart', product)">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;

  padding: 2%;
  flex: 1 16%;

  background-color: #fff;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25);
}

.product-image img {
  width: 100%;
}

.product-info {
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
}

.on-sale {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
