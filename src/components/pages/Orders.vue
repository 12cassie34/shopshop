<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th width="200">購買時間</th>
          <th width="200">Email</th>
          <th>購買款項</th>
          <th width="150">應付金額</th>
          <th width="120">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th scope="row">{{ order.create_at }}</th>
          <td>{{ order.user.email}}</td>
          <td>
              <ul v-for="product in order.products" :key="product.id">
                  <li>{{ product.product.title }}</li>
              </ul>
          </td>
          <td>{{ order.total}}</td>
          <td v-if="order.is_paid === true" class="text-success"><strong>已付款</strong></td>
          <td v-if="order.is_paid === false" class="text-danger"><strong>未付款</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tr th:first-child {
    font-weight: normal;
}
</style>

<script>
export default {
    name: "Orders",
    data() {
        return {
            orders: [],
            isLoading: false,
        }
    },
    methods: {
        getOrders() {
            this.isLoading = true;
            const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/orders?page=:page`;
            const vm = this;
            this.$http.get(api).then((response) => {
                vm.orders = response.data.orders;
                for (let i = 0; i < vm.orders.length; ++i) {
                    let orderTime = vm.orders[i].create_at;
                    var date = new Date(orderTime * 1000);
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let date = date.getDate();
                    vm.orders[i].create_at = year + "/" + month + "/" + date;
                    vm.isLoading = false;
                }
            });
            
        }
    },
    mounted() {
        this.getOrders();
    }
}
</script>