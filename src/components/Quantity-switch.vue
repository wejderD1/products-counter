<template>
  <label class="switch relative inline-block w-14">
    <input v-model="isChecking" type="checkbox" name="switch" @change="checking"/>
    <span
      class="slider absolute top-0 left-0 bottom-0 right-0 bg-red-300 border-rose-700 border rounded-3xl transition-all duration-500 ease-linear before:absolute before:left-1 before:top-1 before:content-[''] before:h-5 before:w-5 before:rounded-full before:bg-white before:duration-500"
    ></span>
    <p>{{ isChecking ? "pieces" : "gram" }}</p>
  </label>
</template>

<script>
export default {
  data() {
    return {
      isChecking: false,
    };
  },

  methods: {
    checking() {
      this.$emit("checking", this.isChecking)
    }
  }
};
</script>
