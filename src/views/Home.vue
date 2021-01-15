<template>
  <template v-if="!loading">
    <Header
      :categories="categories"
      :selectedCategory="selectedCategory"
      :sortOptions="sortOptions"
      :selectedSortOption="selectedSortOption"
      :maxPrice="maxPrice"
      @categorySelected="onCategorySelected($event)"
      @sortOptionSelected="onSortOptionSelected($event)"
      @priceRangeChanged="priceRange = $event"
    ></Header>
    <Cart :products="cartProducts"></Cart>
    <ProductList
      :products="filteredByPrice"
      @addedToCart="addToCart($event)"
    ></ProductList>
  </template>
  <div v-else>
    loading...
  </div>
</template>

<script>
import axios from "axios";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";
import { groupBy } from "@/utils/group-by";
import Cart from "@/components/Cart";

export default {
  name: "App",
  data() {
    return {
      products: [],
      cartProducts: [],
      selectedCategory: "All",
      sortOptions: [
        "Alphabetically, A-Z",
        "Alphabetically, Z-A",
        "Price, low to high",
        "Price, high to low"
      ],
      selectedSortOption: "Alphabetically, A-Z",
      loading: false,
      priceRange: this.maxPrice
    };
  },
  computed: {
    categories() {
      return ["All", ...Object.keys(groupBy(this.products, "category"))];
    },
    filteredProducts() {
      let filteredProducts = this.products;

      if (this.selectedCategory !== "All") {
        filteredProducts = this.products.filter(
          product => product.category === this.selectedCategory
        );
      }

      return filteredProducts;
    },
    filteredByPrice() {
      return this.filteredProducts
        .filter(p => p.price <= this.priceRange)
        .sort((a, b) => {
          const comparer = (prop, asc) =>
            asc
              ? a[prop] === b[prop]
                ? 0
                : a[prop] < b[prop]
                ? -1
                : 1
              : a[prop] === b[prop]
              ? 0
              : a[prop] > b[prop]
              ? -1
              : 1;

          switch (this.selectedSortOption) {
            case "Alphabetically, A-Z":
              return comparer("title", true);
            case "Alphabetically, Z-A":
              return comparer("title", false);
            case "Price, low to high":
              return comparer("price", true);
            case "Price, high to low":
              return comparer("price", false);
          }
        });
    },
    maxPrice() {
      return Math.max(...this.filteredProducts.map(p => p.price));
    }
  },
  components: {
    ProductList,
    Cart,
    Header
  },
  async mounted() {
    try {
      this.loading = true;
      this.products = (
        await axios.get("https://fakestoreapi.com/products")
      ).data;
      console.log(this.products);
      this.loading = false;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    onCategorySelected(category) {
      this.selectedCategory = category;
    },
    onSortOptionSelected(option) {
      this.selectedSortOption = option;
    },
    addToCart(product) {
      this.cartProducts.push(product);
    }
  },
  watch: {
    maxPrice(val) {
      this.priceRange = val;
    }
  }
};
</script>

<style>
/*------------------------------------*\
    RESET
\*------------------------------------*/
/* https://meyerweb.com/eric/tools/css/reset/
    v2.0b1 | 201101
    NOTE:WORK IN PROGRESS
    USE WITH CAUTION AND TEST WITH ABANDON */

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: ’’;
  content: none;
}

/* remember to define visible focus styles!
    :focus{
      outline:?????;
    } */

/* remember to highlight inserts somehow! */
ins {
  text-decoration: none;
}

del {
  text-decoration: line-through;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*------------------------------------*\
      $MAIN
    \*------------------------------------*/

@import url(https://fonts.googleapis.com/css?family=Roboto:400, 300, 500);

body {
  margin: 0 auto;
  width: 90%;
  max-width: 1240px;
  font-family: "Roboto", sans-serif;
  background-color: #f6f6f6;
}

/* Typography */

h1 {
  font-size: 28px;
  font-weight: 300;
}

h5 {
  font-weight: 500;
  line-height: 1.7em;
}

h6 {
  color: #666;
  font-size: 14px;
}

/* Product Layout */

.product-filter {
  display: flex;
  padding: 30px 0;
}

.sort {
  display: flex;
  align-self: flex-end;
  flex: 1;
  margin-left: 100px;
}

.collection-sort {
  display: flex;
  flex-direction: column;
}

.collection-sort:first-child {
  padding-right: 20px;
}

label {
  color: #666;
  font-size: 10px;
  font-weight: 500;
  line-height: 2em;
  text-transform: uppercase;
}

@media (max-width: 920px) {
  .product-card {
    flex: 1 21%;
  }

  .products .product-card:first-child,
  .products .product-card:nth-child(2) {
    flex: 2 46%;
  }
}

@media (max-width: 600px) {
  .product-card {
    flex: 1 46%;
  }
}

@media (max-width: 480px) {
  h1 {
    margin-bottom: 20px;
  }

  .product-filter {
    flex-direction: column;
  }

  .sort {
    align-self: flex-start;
  }
}
</style>
