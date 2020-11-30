<template>
  <div class="container">
    <div class="total-area">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th></th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">總價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cartProduct in cartProducts" :key="cartProduct.id">
            <td><i class="far fa-trash-alt"></i></td>
            <td>{{ cartProduct.product.title }}</td>
            <td>{{ cartProduct.qty }} {{ cartProduct.product.unit }}</td>
            <td>{{ cartProduct.total }}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>總計</td>
            <td>{{ subtotal }}</td>
          </tr>
          <tr class="coupon-total">
            <td colspan="2"></td>
            <td>折扣價</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="請輸入折購碼"
        aria-label="請輸入折購碼"
        aria-describedby="button-coupon"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-coupon"
        >
          套用優惠碼
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  width: 70%;
}
.fa-trash-alt {
  color: indianred;
}
.coupon-total {
  color: mediumseagreen;
  font-weight: bold;
  font-size: 16px;
}
</style>
<script>
export default {
  name: "Cartcalculate",
  data() {
    return {
      cartProducts: [],
      subtotal: 0,
      finalTotal: 0,
    };
  },
  created() {
    const vm = this;
    this.$bus.$on("get:cart", (shoppingCart) => {
      vm.cartProducts = shoppingCart;
    });
    this.$bus.$on("get:subtotal", (subtotal) => {
      vm.subtotal = subtotal;
    });
    this.$bus.$on("get:finalTotal", (finalTotal) => {
      vm.finalTotal = finalTotal;
    });
  },
};
</script>