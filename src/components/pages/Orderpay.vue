<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="toPay()">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="(product, key) in products">
              <td class="align-middle">{{ product.product.title }}</td>
              <td class="align-middle">{{ product.product.num }}</td>
              <td class="align-middle text-right">{{ product.product.price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right" v-for="(product, key) in products">{{ product.final_total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="hasPaid === false">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <button v-if="hasPaid === false" class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            hasPaid: false,
            products: [],
            user: []
        }
    },
    methods: {
        getOrderTable() {
            const orderId = this.orderId;
            const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/order/${orderId}`;
            const vm = this;
            this.$http.get(api).then((response) => {
                vm.products = response.data.order.products;
                vm.user = response.data.order.user;
            });
        },
        toPay() {
            const orderId = this.orderId;
            const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/pay/${orderId}`;
            const vm = this;
            this.$http.post(api).then((response) => {
                if (response.data.success) {
                    vm.hasPaid = true;
                }
            });
        }
    },
    created() {
        this.orderId = this.$route.params.orderId;
    },
    mounted() {
        this.getOrderTable();
    }
}
</script>