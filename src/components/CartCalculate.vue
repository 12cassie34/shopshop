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
            <td><button @click="remove(cartProduct.id)" type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i></button></td>
            <td>
              {{ cartProduct.product.title }}
              <div v-if="cartProduct.coupon" class="text-success"><strong>已套用優惠券</strong></div>
            </td>
            <td>{{ cartProduct.qty }} {{ cartProduct.product.unit }}</td>
            <td>{{ cartProduct.total }}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>總計</td>
            <td>{{ subtotal }}</td>
          </tr>
          <tr v-if="subtotal !== finalTotal" class="coupon-total">
            <td colspan="2"></td>
            <td>折扣價</td>
            <td>{{ finalTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="input-group mb-3">
      <input
        v-model="couponCode"
        type="text"
        class="form-control"
        placeholder="請輸入折購碼"
        aria-label="請輸入折購碼"
        aria-describedby="button-coupon"
      />
      <div class="input-group-append">
        <button
          @click.prevent="useCoupon"
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
      couponCode: ''
    };
  },
  methods: {
      remove(id) {
        const confirmed = confirm("您確定嗎？");
        if (confirmed) {
            const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/cart/${id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
            vm.$emit('passFunction');
          });
        } else {
            return false;
        }
      },
      useCoupon() {
        const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/coupon`;
        const vm = this;
        const couponCode = {
          code: vm.couponCode
        }
        this.$http.post(api, { data: couponCode }).then((response) => {
          vm.finalTotal = response.data.data.final_total;
        });
      }
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