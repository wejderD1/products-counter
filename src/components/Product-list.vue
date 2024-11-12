<template>
  <div class="list-wrap w-4/6">
    <div class="empty-list-message uppercase" v-if="emptyProductList === 0">
      add products by clicking the
      <span class="text-rose-700">"new product "</span> button or select a
      recipe from the list
    </div>
    <ul v-else class="product-list w-full flex flex-col justify-start text-lg">
      <li
        v-for="(item, productName, index) in productsList[recipeName]"
        :key="index"
        class="product-item w-full py-2 border-b border-rose-700 border-solid flex justify-between"
      >
        <p class="product-name grow justify-start">{{ productName }}</p>
        <div class="purchased-wrapper flex w-3/12">
          <p class="price basis-24 pr-5">{{ item.price }} {{ currency }}</p>
          <p class="quantity pr-10">
            {{ item.prodctQuantity }} {{ item.unit }}
          </p>
        </div>
        <div class="used-wrapper flex justify-start w-3/12">
          <p
            @click="quantityHandler(productName)"
            class="used-product pr-5 basis-28 text-red-900"
          >
            {{ item.usedProductCount === 0 ? "-" : item.usedProductCount }}
            {{ item.unit }}.
          </p>
          <p class="used-price pr-5 text-red-900">
            {{ item.usedProductCount !== "-" ? item.priceUsedProduct : 0 }}
            {{ currency }}
          </p>
        </div>
        <delete-button @click.stop="deleteProduct(productName)" />
      </li>
    </ul>
  </div>
</template>

<script>
import DeleteButton from "./Delete-button.vue";

export default {
  components: {
    DeleteButton,
  },

  props: {
    recipeName: {
      type: String,
      required: true,
    },
    productsList: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },

  computed: {
    emptyProductList() {
      return Object.keys(this.productsList).length
    }
  },

  data() {
    return {};
  },

  emits: {
    quantityHandler: null,
    deleteProduct: null,
  },

  methods: {
    quantityHandler(productName) {
      this.$emit("quantityHandler", productName);
    },

    deleteProduct(productName) {
      this.$emit("deleteProduct", productName);
    },
  },

};
</script>
