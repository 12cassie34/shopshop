<template>
  <div class="row">
    <loading :active.sync="isLoading"></loading>
    <div class="col-md-4 mb-4" v-for="(product, key) in products" :key="key">
      <div class="card border-0 shadow-sm">
        <div
          style="
            height: 150px;
            background-size: cover;
            background-position: center;
          "
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
        ></div>
        <div class="card-body">
          <span class="badge badge-secondary float-right ml-2">分類</span>
          <h5 class="card-title">
            <a href="#" class="text-dark">{{ product.title }}</a>
          </h5>
          <p class="card-text">{{ product.description }}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <button
            @click="getSingleProduct(product.id)"
            type="button"
            class="btn btn-outline-secondary btn-sm"
          >
            <i
              class="fas fa-spinner fa-spin"
              v-if="status.loadingItem == product.id"
            ></i>
            查看更多
          </button>
          <button
            @click="addCart(product.id)"
            type="button"
            class="btn btn-outline-danger btn-sm ml-auto"
          >
            <i
              class="fas fa-spinner fa-spin"
              v-if="status.addingChart == product.id"
            ></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <div
      v-model="singleProduct"
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ singleProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="`${singleProduct.imageUrl}`"
              :alt="`${singleProduct.title}`"
            />
            <h4>
              <strong>{{ singleProduct.description }}</strong>
            </h4>
            <div class="price-row row">
              <div class="col-4">
                <del class="h6">原價 {{ singleProduct.origin_price }} 元</del>
              </div>
              <div class="col-8 price">
                <div class="h5">現在只要 {{ singleProduct.price }} 元</div>
              </div>
            </div>
            <select
              v-model="singleProduct.num"
              name="qty"
              id="product-qty"
              class="form-control form-control-lg"
            >
              <option :value="num" v-for="num in 10" :key="num">
                {{ num }} / {{ singleProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div>小計 {{ singleProduct.price * singleProduct.num }} 元</div>
            <button
              @click="addCart(singleProduct.id, singleProduct.num)"
              type="button"
              class="btn btn-primary"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Cartcalculate @passFunction="getCart"></Cartcalculate>
    <Buyerinfo></Buyerinfo>
  </div>
</template>

<style scoped>
.product-image {
  width: 500px;
  height: 100%;
}
.col-8.price {
  text-align: right;
}
</style>

<script>
import $ from "jquery";
import Cartcalculate from "../CartCalculate";
import Buyerinfo from "../BuyerInfo";

export default {
  name: "CustomerOrder",
  components: {
    Cartcalculate,
    Buyerinfo
  },
  data() {
    return {
      products: [],
      singleProduct: {},
      status: {
        loadingItem: "",
        addingChart: "",
      },
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/products?page=:page`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        this.isLoading = false;
      });
    },
    getSingleProduct(id) {
      this.isLoading = true;
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.singleProduct = response.data.product;
        vm.status.loadingItem = "";
        this.isLoading = false;
      });
      $("#productModal").modal("show");
    },
    addCart(id, qty = 1) {
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/cart`;
      const vm = this;
      vm.status.addingChart = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log(response.data);
        // vm.getCart();
        vm.status.addingChart = "";
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        const shoppingCart = response.data.data.carts;
        const subtotal = response.data.data.total;
        const finalTotal = response.data.data.final_total;
        this.$bus.$emit("get:cart", shoppingCart);
        this.$bus.$emit("get:subtotal", subtotal);
        this.$bus.$emit("get:finalTotal", finalTotal);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
};
</script>