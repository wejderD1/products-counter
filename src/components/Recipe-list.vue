<template>
  <div
    v-if="isOpenRecipeList"
    class="popup-wraper z-10 absolute top-0 left-0 min-w-full min-h-screen bg-gray-400 bg-opacity-60"
  >
    <div
      class="popup w-2/5 h-auto bg-rose-100 border-solid border-2 border-red-800 rounded-lg mx-auto mt-6 p-6 text-red-900 flex flex-col justify-start items-start"
      @click.stop
    >
      <h1 class="popup-title pb-2 uppercase">open recipe</h1>
      <p
        class="information-text text-left text-xs border-b-2 border-red-900 mb-3"
      >
        select the desired recipe or enter a name
      </p>

      <!-- recipe list -->
      <div class="list-wrap w-full my-4">
        <div
          class="empty-list-message uppercase"
          v-if="recipeList.length === 0"
        >
          recipe list is empty
        </div>
        <!-- product-list items -->
        <ul class="product-list flex flex-col justify-start text-lg mr-7">
          <li
            v-for="(item, index) in recipeList"
            :key="index"
            class="product-item py-2 border-b border-rose-700 hover:bg-rose-200 border-solid flex justify-between"
            :class="recipeName === item ? 'active-item' : ''"
            @click="selectedRecipe(item)"
          >
            <p class="product-name grow">{{ item }}</p>
            <delete-button @click.stop="deleteRecipe(item)" />
          </li>
        </ul>
      </div>

      <!-- BUTTON CONTAINER -->
      <div class="button-wrapper w-full flex justify-start py-4">
        <input
          type="button"
          class="btn popup-btn bg-red-300"
          :class="recipeList.length === 0 ? 'disabled' : ''"
          :disabled="recipeList.length === 0"
          @click="confirm"
          name="open-btn"
          value="Open"
        />
        <button class="btn popup-btn ml-2" @click="close">сlose</button>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from "./Delete-button.vue";

export default {
  components: {
    DeleteButton,
  },

  props: {
    isOpenRecipeList: {
      type: Boolean,
      required: true,
    },
    recipeList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      recipeName: "",
    };
  },

  emits: {
    confirm: null,
    close: null,
    deleteRecipe: null,
  },

  methods: {
    deleteRecipe(recipeName) {
      this.$emit("deleteRecipe", recipeName);
    },

    selectedRecipe(recipeName) {
      this.recipeName = recipeName;
    },

    //нужно вводить имя и в списке остается только то что найдется
    findRecipe() {},

    confirm() {
      this.$emit("confirm", this.recipeName);
      this.recipeName = "";
    },

    close() {
      this.$emit("close");
      this.recipeName = "";
    },
  },
};
</script>

<style>
.active-item {
  background-color: rgb(254 205 211);
}
</style>
