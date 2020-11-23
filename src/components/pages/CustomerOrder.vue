<template>
  <div class="row">
    <div class="col-md-4 mb-4" v-for="(product, key) in products">
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
            <!-- <div class="h5">2,800 元</div> -->
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
            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == product.id"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == product.id"></i>
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
            <h5 class="modal-title" id="productModalLabel">{{singleProduct.title}}</h5>
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
              <img :src="`${singleProduct.imageUrl}`" :alt="`${singleProduct.title}`">
              <h4><strong>{{singleProduct.description}}</strong></h4>
              <div class="price-row row">
                  <div class="col-4"><del class="h6">原價 {{ singleProduct.origin_price }} 元</del></div>
                  <div class="col-8 price"><div class="h5">現在只要 {{ singleProduct.price }} 元</div></div>
              </div>
          </div>
          <div class="modal-footer">
            <div>小計 {{ singleProduct.price }} 元</div>
            <button type="button" class="btn btn-primary">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
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

export default {
  name: "CustomerOrder",
  data() {
    return {
      products: [],
      singleProduct: {},
      status: {
          loadingItem: '',
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
      });
    },
    getSingleProduct(id) {
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.singleProduct = response.data.product;
        vm.status.loadingItem = '';
      });
      $("#productModal").modal("show");
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>