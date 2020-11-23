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
          :style="{backgroundImage: `url(${product.imageUrl})`}"
        ></div>
        <div class="card-body">
          <span class="badge badge-secondary float-right ml-2">分類</span>
          <h5 class="card-title">
            <a href="#" class="text-dark">{{product.title}}</a>
          </h5>
          <p class="card-text">{{product.description}}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <!-- <div class="h5">2,800 元</div> -->
            <del class="h6">原價 {{product.origin_price}} 元</del>
            <div class="h5">現在只要 {{product.price}} 元</div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <button type="button" class="btn btn-outline-secondary btn-sm">
            <i class="fas fa-spinner fa-spin"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
            <i class="fas fa-spinner fa-spin"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerOrder",
  data() {
    return {
      products: [],
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>