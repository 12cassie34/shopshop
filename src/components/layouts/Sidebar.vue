<template>
  <div class="nav-containr">
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow upper-nav"
    >
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"
        >Company name</a
      >
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
    <div>
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="sidebar-sticky pt-3">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>管理員</span>
            <a
              class="d-flex align-items-center text-muted"
              href="#"
              aria-label="Add a new report"
            >
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link" :class="{'active' : $route.path == '/admin/products'}">
                <span data-feather="home"></span>
                <i class="fas fa-list-ul"></i>
                產品列表</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file"></span>
                <i class="fas fa-shopping-cart"></i>
                訂單列表
              </a>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupons" class="nav-link" :class="{'active' : $route.path == '/admin/coupons'}">
                <span data-feather="shopping-cart"></span>
                <i class="fas fa-ticket-alt"></i>
                優惠券
              </router-link>
            </li>
          </ul>

          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>模擬功能</span>
            <a
              class="d-flex align-items-center text-muted"
              href="#"
              aria-label="Add a new report"
            >
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <router-link to="/customer_order" class="nav-link" :class="{'active' : $route.path == '/customer_order'}">
                <span data-feather="file-text"></span>
                <i class="fas fa-store-alt"></i>
                模擬訂單</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style>
.nav-containr {
  width: 100%;
}
</style>

<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  methods: {
    signout() {
      let api = `${process.env.PATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          alert("您已登出");
          location.href = "/login";
        }
      });
    },
  },
};
</script>