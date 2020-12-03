<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <button
      @click="showCouponModal(true)"
      type="button"
      class="btn btn-primary coupon-button"
      data-toggle="modal"
      data-target="#couponModal"
    >
      新增優惠券
    </button>
    <div class="table-container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">折扣百分比</th>
            <th scope="col">到期日</th>
            <th scope="col">是否啟用</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <th scope="row">{{ coupon.title }}</th>
            <td>{{ coupon.percent }}</td>
            <td>{{ coupon.due_date }}</td>
            <td>{{ coupon.is_enabled }}</td>
            <td>
              <button
                @click.prevent="showCouponModal(false, coupon)"
                type="button"
                class="btn btn-outline-primary"
              >
                編輯
              </button>
              <button @click.prevent="deleteCoupons(coupon.id)" type="button" class="btn btn-outline-danger">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModalLabel">優惠券</h5>
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
            <div class="form-group">
              <label for="couponName">標題</label>
              <input
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                id="couponName"
              />
            </div>
            <div class="form-group">
              <label for="couponCode">優惠碼</label>
              <input
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                id="couponCode"
              />
            </div>
            <div class="form-group">
              <label for="couponExpir">到期日</label>
              <input
                v-model="tempCoupon.due_date"
                type="date"
                class="form-control"
                id="couponExpir"
              />
            </div>
            <div class="form-group">
              <label for="couponDiscount">折扣百分比</label>
              <input
                v-model="tempCoupon.percent"
                type="text"
                class="form-control"
                id="couponDiscount"
              />
            </div>
            <div class="form-group form-check">
              <input
                v-model="tempCoupon.is_enabled"
                type="checkbox"
                class="form-check-input"
                id="startUse"
              />
              <label class="form-check-label" for="startUse">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              @click="updateCoupons()"
              type="button"
              class="btn btn-primary"
            >
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coupon-button {
  margin-bottom: 15px;
  float: right;
}
</style>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
    getCoupon() {
      this.isLoading = true;
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/coupons?page=:page`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        this.isLoading = false;
      });
    },
    showCouponModal(isNew, item) {
      this.isLoading = true;
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
        this.isLoading = false;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
        this.isLoading = false;
      }
      $("#couponModal").modal("show");
    },
    updateCoupons() {
      this.isLoading = true;
      let api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/coupon`;
      let method = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        method = "put";
      }
      this.$http[method](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupon();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupon();
          console.log("新增失敗");
        }
      });
    },
    deleteCoupons(id) {
      const confirmed = confirm("您確定要刪除這個優惠券嗎？");
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/coupon/${id}`;
      const vm = this;
      if (confirmed) {
        this.$http.delete(api).then((response) => {
          this.getCoupon();
        });
      } else {
          return false;
      }
    },
  },
  created() {
    this.getCoupon();
  },
};
</script>