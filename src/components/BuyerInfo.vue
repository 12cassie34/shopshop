<template>
  <div class="my-5 row justify-content-center">
    <ValidationObserver v-slot="{ invalid }" style="width: 500px;">
      <form class="col-12" @submit.prevent="submitOrder()">
        <div class="form-group">
          <label for="useremail">Email</label>
          <ValidationProvider rules="email|required" v-slot="{ errors }">
            <input
              v-model="userData.user.email"
              :class="{ 'is-invalid': errors[0] }"
              type="email"
              class="form-control"
              name="Email"
              id="useremail"
              placeholder="請輸入 Email"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>

          <span class="text-danger"></span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
          <input
            v-model="userData.user.name"
            :class="{ 'is-invalid': errors[0] }"
            type="text"
            class="form-control"
            name="姓名"
            id="username"
            placeholder="輸入姓名"
          />
          <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
           <ValidationProvider rules="required|alpha_dash" v-slot="{ errors }">
          <input
            v-model="userData.user.tel"
            :class="{ 'is-invalid': errors[0] }"
            type="tel"
            class="form-control"
            id="usertel"
            name="電話"
            placeholder="請輸入電話"
          />
          <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
          <input
            v-model="userData.user.address"
            :class="{ 'is-invalid': errors[0] }"
            type="text"
            class="form-control"
            name="地址"
            id="useraddress"
            placeholder="請輸入地址"
          />
          <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            v-model="userData.message"
            name="留言"
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="text-right">
          <button type="submit" :disabled="invalid" class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<style scoped>
.my-5 {
  width: 100%;
}
</style>

<script>
export default {
  name: "Buyerinfo",
  data() {
    return {
      userData: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    submitOrder() {
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/order`;
      const vm = this;
      const buyerData = vm.userData;
      this.$http.post(api, { data: buyerData }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push(`/customer_order/${response.data.orderId}`);
        }
      });
    },
  },
};
</script>