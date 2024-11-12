<template>
  <div class="blocking absolute top-0 left-0 min-w-full min-h-screen z-30">
    <div
      class="dialog-container absolute left-1/2 top-1/3 z-10 transition w-96 rounded-2xl bg-rose-100 p-5 border border-solid border-gray-500"
    >
      <div class="dialog-wrapper flex flex-col space-y-8">
        <span class="text-xl uppercase font-normal text-red-800">{{
          title
        }}</span>
        <p class="information">{{ information }}</p>

        <!-- info dialog window -->
        <div v-if="options.type === 'info'">
          <div
            class="w-full flex justify-start space-x-3 pt-4 border-t border-red-800"
          >
            <button class="popup-btn w-14 self-end" @click="infoHandler(options.methodName)">
              Ok
            </button>
          </div>
        </div>

        <!-- quesion dialog window -->
        <div v-if="options.type === 'question'">
          <div
            class="w-full flex justify-start space-x-3 pt-4 border-t border-red-800"
          >
            <button class="popup-btn w-14 self-end" @click="questionHandler">
              Ok
            </button>
            <button class="popup-btn w-14 self-end" @click="close">No</button>
          </div>
        </div>

        <!-- input dialog window -->
        <div v-if="options.type === 'input'">
          <div class="insert-container">
            <label for="user-input"></label>
            <input
              class="product-input user-input border rounded"
              ref="product"
              v-model="inputData"
              autocomplete="off"
              type="text"
              name="user-input"
              :placeholder="options.insertData"
              @keyup.enter="inputHandler(options.insertData)"
            />
          </div>
          <div
            class="w-full flex justify-start space-x-3 pt-4 mt-4 border-t border-red-800"
          >
            <button
              class="popup-btn w-16 self-end"
              @click="inputHandler(options.insertDataHandler)"
            >
              Ok
            </button>
            <button class="popup-btn w-14 self-end" @click="close">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    options: {
      type: Object,
    },
    information: {
      type: String,
    },
  },

  setup() {
    const inputData = null;
    const res = false;

    return {
      inputData,
      res,
    };
  },

  emits: {
    confirm: null,
    close: null,
  },

  watch: {
    type() {},
  },

  methods: {
    questionHandler(callback) {
      this.res = true;
      this.$emit("confirm", { res: this.res }, callback);
    },

    infoHandler(callback) {
      this.$emit("confirm", {res: !this.res}, callback);
    },

    inputHandler(methodName) {
      this.$emit("confirm", { res: this.inputData }, methodName);
      this.inputData = "";
    },

    close() {
      this.$emit("close");
      this.inputData = "";
    },
  },
};
</script>

<style>
.dialog-container {
  transform: translateX(-50%);
  margin-top: -8rem;
}
</style>
