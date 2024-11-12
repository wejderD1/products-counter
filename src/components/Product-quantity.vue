<template>
  <div
    v-if="isOpen"
    class="popup-wraper z-10 absolute top-0 left-0 min-w-full min-h-screen bg-gray-300 bg-opacity-60"
  >
    <div
      class="popup w-2/5 h-auto bg-rose-100 border-solid border-2 border-red-800 rounded-lg mx-auto mt-6 p-6 text-red-900 text-center flex flex-col justify-start items-start"
      @click.stop
    >
      <div class="popup-inner flex justify-between">
        <div class="insert-container flex justify-start flex-col w-48">
          <label for="price">product used</label>
          <input
            type="number"
            name="unit"
            min="1"
            class="amount border rounded border-rose-700 w-full mt-2"
            v-model="usedProductCount"
          />
        </div>
        <div class="information-block px-4">
          <h3 class="information-title text-center uppercase">
            user information
          </h3>
          <p
            class="information-text text-left text-xs border-b-2 border-red-900 mb-3"
          >
            enter the amount of product used in grams or pieces
          </p>
        </div>
      </div>

      <div class="w-full flex justify-start py-4">
        <button class="btn popup-btn" @click="confirm">Add</button>
        <button class="btn popup-btn ml-2" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    close: null,
    confirm: null,
  },
  data() {
    return {
      picked: "gr",
      usedProductCount: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm", this.usedProductCount);
      this.usedProductCount = null;
    },
  },
};
</script>

<style></style>
