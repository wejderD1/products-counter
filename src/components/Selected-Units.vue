<template>
  <div class="units-container flex items-center space-x-2">
    <div class="flex flex-col">
      <label class="unit-label relative" for="gram"
        >gram
        <input
          class="unit-selected"
          type="radio"
          name="unit"
          value="gram"
          id="gram"
          v-model="unitModel"
          @change="changeUnit"
        />
        <span
          class="selected-unit"
        ></span>
      </label>
    </div>
    <div class="flex flex-col">
      <label class="unit-label relative" for="pieces"
        >pieces
        <input
          type="radio"
          name="unit"
          value="pieces"
          id="pieces"
          v-model="unitModel"
          @change="changeUnit"
        />
        <span
          class="selected-unit"
        ></span>
      </label>
    </div>
    <div class="flex flex-col">
      <label class="unit-label relative" for="ml"
        >ml
        <input
          type="radio"
          name="unit"
          value="ml"
          id="ml"
          v-model="unitModel"
          @change="changeUnit"
        />
        <span
          class="selected-unit"
        ></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitModel: "gram",
    };
  },

  emits: {
    changeUnit: null,
  },

  methods: {
    changeUnit() {
      this.$emit("changeUnit", this.unitModel);
    },
  },

  mounted() {
    this.$emit("changeUnit", this.unitModel);
  },
};
</script>

<style>
.unit-label {
  position: relative;
}

.unit-label > input {
  display: none;
}

input:checked + span {
  background-color: rgba(248, 98, 98, 0.953);
}
</style>
