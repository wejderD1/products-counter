<template>
  <div class="container mx-auto flex flex-col h-full relative">
    <new-product
      :isOpen="this.newProductWindowActive"
      @confirm="addProduct"
      @close="closePopup"
    />

    <product-quantity
      :isOpen="this.isActivePopupQuantity"
      :title="dialogTitle"
      @close="closePopup"
      @confirm="addQuantity"
    />

    <dialog-window
      :options="dialogWindowOptions"
      :title="dialogTitle"
      :information="dialogInformation"
      v-show="dialogVisible"
      @close="closeDialogWindow"
      @confirm="dialogResponse"
    />
    <!-- RECIPE-LIST -->
    <recipe-list
      :isOpenRecipeList="isOpenRecipeList"
      :recipe-list="recipeList"
      @confirm="selectRecipe"
      @close="this.isOpenRecipeList = false"
      @deleteRecipe="deleteRecipe"
    />

    <!-- MAIN -->
    <main class="main relative flex flex-col h-full pb-9">
      <!-- HEADER -->
      <header class="header p-4 flex justify-start bg-red-400">
        <button class="btn header-btn" @click="newProductHandler()">
          new product
        </button>
        <button class="btn header-btn" @click="clearProductListHandler">
          clear list
        </button>
        <select
          class="currency-select bg-red-300 border border-solid border-rose-700 hover:bg-red-200 hover:cursor-pointer rounded-md mx-4 outline-0"
          v-model="currency"
        >
          <option
            v-for="(item, index) in options"
            class="option"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>

        <div class="flex border-l border-solid border-red-800 pl-4">
          <button class="btn header-btn w-64" @click="newRecipeNameHandler">
            new recipe
          </button>
          <button class="btn header-btn w-3/6" @click="recipeListHandler">
            recipe list
          </button>
        </div>
      </header>

      <!-- TITLE -->
      <div class="recipe-title-container m-4">
        <h2 class="recipe-title uppercase text-xl font-bold font-sans">
          {{ recipeName ? recipeName : "new recipe" }}
        </h2>
      </div>

      <!-- CONTENT -->
      <div class="content p-4 flex">
        <!-- produvct list -->
        <product-list
          :products-list="recipeContent"
          :recipe-name="recipeName"
          :currency="currency"
          @quantityHandler="productQuantityHandler"
          @deleteProduct="deleteProductHandler"
        />

        <!-- result block -->
        <div class="result-wrapper w-2/6 grid ml-6 gap-2 text-sm max-h-80">
          <h1 class="sum text-xl font-medium">
            cost of 1 piece
            {{ unitCost }}
            <!-- обчислення собівартості продукту в залежності від кількості  -->
            <span>{{ currency }}</span>
          </h1>
          <h1 class="sum text-xl font-medium">
            price of 1 piece
            {{ unitPrice }}
            <span>{{ currency }}</span>
          </h1>
          <label for="amount"
            >insert amount (enter the number of finished product pieces)</label
          >
          <input
            type="number"
            name="amount"
            :min="1"
            class="amount border rounded border-rose-700 w-1/4"
            :class="{ disabled: emptyProductsList }"
            :disabled="emptyProductsList"
            v-model="pieceCount"
          />
          <h1
            class="sum text-xl font-medium border-t-2 border-rose-700 pt-4 mt-4"
          >
            cost price {{ cost }}
            <span>{{ currency }}</span>
          </h1>
          <h1 class="sum text-2xl font-medium text-rose-700">
            product price {{ generalPrice }}
            <span>{{ currency }}</span>
          </h1>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer w-full h-20 bg-red-400"></footer>
  </div>
</template>

<script>
import ProductQuantity from "./components/Product-quantity.vue";
import NewProduct from "./components/New-product.vue";
import ProductList from "./components/Product-list.vue";
import DialogWindow from "./components/Dialog-window.vue";
import RecipeList from "./components/Recipe-list.vue";

export default {
  name: "App",

  components: {
    DialogWindow,
    ProductList,
    ProductQuantity,
    NewProduct,
    RecipeList,
  },

  data() {
    return {
      currentProduct: null,
      productsList: {},
      options: ["PLN", "USD", "EUR"],
      currency: "PLN",
      sum: 0,
      pieceCount: 1,
      recipeName: "",
      recipeContent: {},
      recipeList: [],

      isActivePopupQuantity: false,
      isOpenRecipeList: false,
      newProductWindowActive: false,
      dialogVisible: false,

      dialogWindowOptions: {},
      dialogData: "",
      dialogTitle: "",
      dialogInformation: "",
    };
  },

  watch: {
    productsList: {
      handler(val) {
        this.sum = 0;
        for (const key in val) {
          if (Object.hasOwnProperty.call(val, key)) {
            const element = val[key];
            this.sum += element.priceUsedProduct;
          }
        }
      },
      deep: true,
    },

    recipeContent: {
      handler(val) {
        this.recipeList = [...Object.getOwnPropertyNames(val)];
        if (Object.keys(val).length === 0) {
          this.productsList = {};
        }
      },
      deep: true,
    },

    recipeList: {
      handler(val) {
        if (val.length === 0) {
          this.recipeName = "new product";
        }
      },
      deep: true,
    },
  },

  computed: {
    //calculation of the price of the used product
    priceUsedProduct() {
      return Number(
        this.productsList[this.currentProduct].usedProductCount === 0
          ? 0
          : (
              (this.productsList[this.currentProduct].price /
                this.productsList[this.currentProduct].prodctQuantity) *
              this.productsList[this.currentProduct].usedProductCount
            ).toFixed(2)
      );
    },
    //собестоимость за штуку
    unitCost() {
      return (this.sum / this.pieceCount).toFixed(2);
    },
    //цена штуки с надбавкой
    unitPrice() {
      return ((this.sum * 4) / this.pieceCount).toFixed(2);
    },
    //собестоимость готового продукта за штуку
    cost() {
      return this.sum.toFixed(2);
    },
    //цена готового продукта с наценкой
    generalPrice() {
      return (this.cost * 4).toFixed(2);
    },
    
    emptyProductsList() {
      return !Object.keys(this.productsList).length;
    }
  },

  methods: {
    /**
     *
     * @param {Object} options - object that describes the properties of a dialog window.
     * type option: { info - informational, question - questioning, input - information input window }
     * option insertDataHandler: name of method that will process temporary data (so far it works with input window)
     * @param {String} title - window title
     * @param {String} information - user information (default - empty string)
     */
    openDialogWindow(
      options,
      title,
      information = "окно сгенерировано автоматически"
    ) {
      this.dialogWindowOptions = options;
      this.dialogTitle = title;
      this.dialogInformation = information;

      this.dialogVisible = true;
    },

   /**
    * dialog window event handling
    * @param {Object} param0 -  input field data
    * @param {String} methodName - method that will be called when pressing the ok button
    */
    dialogResponse({ res }, methodName) {
      if (!res) {
        return;
      }
      this.dialogData = res;
      this.closeDialogWindow();
      if (this.dialogData && this.$options.methods[methodName]) {
        this.$options.methods[methodName].bind(this)();
      } else {
        return;
      }
    },

    closeDialogWindow() {
      this.dialogVisible = false;
    },

    /**
     * save new product
     */
    newProduct() {
      this.recipeName = this.dialogData;
      this.newProductHandler();
    },

    /**
     * save new recipe name
     */
    newRecipe() {
      this.recipeName = this.dialogData;
      this.productsList = {};
      this.saveRecipeContent();
    },

    /**
     * handling of the event of pressing the *new recipe* button
     */
    newRecipeNameHandler() {
      this.openDialogWindow(
        { type: "input", insertDataHandler: "newRecipe" },
        "new recipe name",
        "insert recipe name"
      );
    },

    /**
     * handling of the event of pressing the *new product* button
     */
    newProductHandler() {
      const recipeName = this.dialogData;
      if (!recipeName || this.recipeName === "new product") {
        this.openDialogWindow(
          { type: "input", insertDataHandler: "newProduct" },
          "insert recipe name",
          "a product cannot be saved to a recipe without a name"
        );
      } else {
        this.newProductWindowActive = true;
      }
    },

    /**
     * add new product to the products list
     * @param {String} productName 
     * @param {Number} productPrice 
     * @param {Number} prodctQuantity 
     * @param {String} productUnit 
     */
    addProduct(productName, productPrice, productQuantity, productUnit) {
      if (!productPrice || !productName || !productQuantity) {
        return;
      }

      this.currentProduct = productName;
      //saved new item into productList
      this.productsList[productName] = {
        price: productPrice,
        usedProductCount: 0,
        prodctQuantity: productQuantity,
        priceUsedProduct: 0,
        unit: productUnit,
      };
      this.newProductWindowActive = false;
      this.saveRecipeContent();
    },

    saveRecipeContent() {
      this.addProduct()
      this.recipeContent[this.recipeName] = { ...this.productsList };
      localStorage.setItem("recipe-list", JSON.stringify(this.recipeContent));
    },

    changeLocalStorage(obj, callback) {
      obj = JSON.parse(localStorage.getItem("recipe-list"));
      callback(obj);
      localStorage.setItem("recipe-list", JSON.stringify(obj));
    },

    /**
     * add quantity to the products list and local storage
     * @param {Number} usedProductCount 
     */
    addQuantity(usedProductCount) {
      let tmpObj = {};
      this.productsList[this.currentProduct].usedProductCount =
        usedProductCount;
      this.productsList[this.currentProduct].priceUsedProduct =
        this.priceUsedProduct;

      this.changeLocalStorage(tmpObj, (obj) => {
        obj[this.recipeName][this.currentProduct].usedProductCount =
          usedProductCount;
        obj[this.recipeName][this.currentProduct].priceUsedProduct =
          this.priceUsedProduct;
      });
      this.isActivePopupQuantity = false;
    },

    deleteProductHandler(item) {
      delete this.recipeContent[this.recipeName][item];
      delete this.productsList[item];
    },

    /**
     * clear product list
    */
    clearProductListHandler() {
      this.recipeContent[this.recipeName] = {};
      localStorage.setItem("recipe-list", JSON.stringify(this.recipeContent));

      this.productsList = {};
      this.openDialogWindow(
          { type: "info", methodName: "closeDialogWindow"},
          "product list is empty",
          ""
        );
    },

    //open popup add product quantity window
    productQuantityHandler(productName) {
      this.currentProduct = productName;
      this.isActivePopupQuantity = true;
    },

    recipeListHandler() {
      this.isOpenRecipeList = true;
    },

    selectRecipe(recipeName) {
      this.recipeName = recipeName;
      this.productsList = this.recipeContent[this.recipeName];
      this.isOpenRecipeList = false;
    },

    deleteRecipe(item) {
      this.recipeList = this.recipeList.filter(
        (recipeName) => recipeName !== item
      );
      delete this.recipeContent[item];
      localStorage.setItem("recipe-list", JSON.stringify(this.recipeContent));
    },

    closePopup() {
      this.newProductWindowActive = false;
      this.isActivePopupQuantity = false;
    },
  },

  beforeMount() {
    if (!localStorage.getItem("recipe-list")) {
      this.recipeName = "new recipe";
      return;
    }

    const content = JSON.parse(localStorage.getItem("recipe-list"));

    if (!content || Object.keys(content).length == 0) {
      this.recipeName = "new recipe";
      return;
    }

    this.recipeContent = content;
    this.recipeName = Object.keys(this.recipeContent)[0];
    this.dialogData = Object.keys(this.recipeContent)[0];
    this.productsList = this.recipeContent[this.recipeName];
  },
};
</script>

<style>
.btn-test {
  width: 80px;
  height: 50px;
  border: 1px black solid;
  margin-right: 20px;
  background-color: beige;
}

body {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 16px;
  height: 100vh;
}

.btn {
  text-transform: uppercase;
  font-size: 14px;
}

.product-item:hover {
  background-color: rgb(175, 213, 248);
  cursor: pointer;
  border-radius: 5px;
}

:active,
:hover,
:focus {
  box-shadow: 0;
}

input[type]:focus,
.currency-select:focus {
  box-shadow: none;
  border: 1px solid rgb(190, 18, 60);
}

.disabled {
  background-color: rgb(238, 192, 184) !important;
  border-color: rgb(145, 129, 129) !important;
}
</style>
