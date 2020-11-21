<template>
  <div>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <navbar></navbar>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../layouts/Sidebar.vue';
import Navbar from '../layouts/Nav.vue';
import Alert from '../AlertMessage.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    Alert,
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)shoptoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  }
}
</script>