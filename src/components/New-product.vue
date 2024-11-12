<template>
  <div
    v-if="isOpen"
    class="popup-wraper z-10 absolute top-0 left-0 min-w-full min-h-screen text-base bg-gray-400 bg-opacity-60"
  >
    <div
      class="popup w-2/5 h-auto bg-rose-100 border-solid border border-gray-500 rounded-lg mx-auto mt-6 p-6 text-red-900 text-center flex flex-col items-start space-y-4"
      @click.stop
    >
      <h1 class="popup-title pb-2 uppercase">new product</h1>
      <p
        class="information-text text-left text-xs border-b-2 border-red-900 mb-3"
      >
        enter the product name, cost and quantity
      </p>
      <label for="product">product name</label>
      <input
        class="product-input user-input border rounded"
        ref="product"
        @keydown.enter="addProducts"
        v-model="productName"
        autocomplete="off"
        type="text"
        name="product"
        id="prod"
        placeholder="insert product name"
      />
      <div class="information-container flex justify-between">
        <div class="flex flex-col items-start mr-2">
          <label for="price">product price</label>
          <input
            class="price-input user-input border rounded"
            @keydown.enter="confirm"
            type="number"
            name="price"
            min="0"
            placeholder="product price"
            v-model="productPrice"
          />
        </div>
        <div class="flex flex-col items-start">
          <label for="quantity">product quantity</label>
          <input
            class="price-input user-input border rounded"
            @keydown.enter="confirm"
            type="number"
            name="quantity"
            min="0"
            placeholder="quantity product"
            v-model="prodctQuantity"
          />
        </div>
      </div>
      <div class="units-selected">
        <selected-units @changeUnit="unitChangeHandler" />
      </div>

      <div
        class="w-full flex justify-start space-x-3 py-4 border-t border-red-800"
      >
        <button class="btn popup-btn" @click="confirm">Add</button>
        <button class="btn popup-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
import SelectedUnits from "./Selected-Units.vue";

export default {
  components: {
    SelectedUnits,
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    focusControled: {
      type: Function,
    },
  },

  data() {
    return {
      productName: "",
      productPrice: null,
      prodctQuantity: null,
      productUnit: null,
    };
  },

  emits: {
    confirm: null,
    close: null,
  },

  methods: {
    confirm() {
      this.$emit(
        "confirm",
        this.productName,
        this.productPrice,
        this.prodctQuantity,
        this.productUnit
      );

      this.productName = "";
      this.productPrice = null;
      this.prodctQuantity = null;
      this.productUnit = null;
    },

    close() {
      this.$emit("close");
    },

    unitChangeHandler(unitName) {
      this.productUnit = unitName;
    },
  },
};
</script>

<style>
.product-input {
  margin-top: 0 !important;
}

.units-selected {
  margin-bottom: 16px !important;
}
</style>
