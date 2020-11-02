<template>
  <div>
    <div class="action">
      <button type="button" class="btn btn-primary float-right"
        @click.prevent="showModal(true)">
        建立新的產品
      </button>
    </div>
    <div class="table-container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="100">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.origin_price }}</td>
            <td>{{ product.price }}</td>
            <td>未啟用</td>
            <td>
              <button type="button" class="btn btn-outline-primary"
                @click.prevent="showModal(false, product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger" @click.prevent="showDelModal(product)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal fade" id="productModal"
        tabindex="-1" role="dialog"
        aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="productModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control"
                      id="image" v-model="temProduct.imageUrl"
                      placeholder="請輸入圖片連結" />
                  </div>
                  <div class="form-group">
                    <label for="customFile">
                      或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile"
                      class="form-control" ref="files"/>
                  </div>
                  <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" alt=""/>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control"
                      id="title" v-model="temProduct.title"
                      placeholder="請輸入標題"/>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control"
                        id="category" v-model="temProduct.category"
                        placeholder="請輸入分類" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control"
                        id="unit" v-model="temProduct.unit"
                        placeholder="請輸入單位"/>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input type="number" class="form-control"
                        id="origin_price" v-model="temProduct.origin_price"
                        placeholder="請輸入原價" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control"
                        id="price" v-model="temProduct.price"
                        placeholder="請輸入售價"/>
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control"
                      id="description" v-model="temProduct.description"
                      placeholder="請輸入產品描述"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control"
                      id="content" v-model="temProduct.content"
                      placeholder="請輸入產品說明內容"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        id="is_enabled" v-model="temProduct.is_enabled"
                        :true-value="1" :false-value="0" />
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary"
                data-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-primary"
                @click.prevent="updateProduct()">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="delProductModal"
        tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong>
              商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary"
                data-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click.prevent="deleteProduct">確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      temProduct: {},
      isNew: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/products?page=:page`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    showModal(isNew, item) {
      if (isNew) {
        this.temProduct = {};
        this.isNew = true;
      } else {
        this.temProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/product`;
      let method = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/product/${vm.temProduct.id}`;
        method = "put";
      }
      this.$http[method](api, { data: vm.temProduct }).then((response) => {
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    showDelModal(product) {
      $("#delProductModal").modal("show");
      this.temProduct = Object.assign({}, product);
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.PATH}/api/${process.env.CUSTOME_PATH}/admin/product/${vm.temProduct.id}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
      });
      $("#delProductModal").modal("hide");
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
