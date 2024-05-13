<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body cart">
            <div class="col-sm-12 empty-cart-cls text-center">
              <img
                src="http://localhost:8000/storage/uploads/clear-search.png"
                width="200"
                height="200"
                class="img-fluid mr-3"
              />
              <h3><strong>Không tìm thấy sản phẩm theo yêu cầu :(</strong></h3>
              <h4>
                Vẫn còn rất nhiều sản phẩm hấp dẫn khác đang đợi bạn khám phá :)
              </h4>
              <div class="button-home mt-4">
                <router-link class="btn-home" :to="{ name: 'home' }">
                  <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Calibri:400,300,700);

a {
  text-decoration: none;
}
.card {
  margin-bottom: 30px;
  border: 0;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  -webkit-box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  font-size: 16px;
}

.card .card-header {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 1px solid #f6f7fb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card .card-body {
  padding: 30px;
  background-color: transparent;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #4466f2 !important;
  border-color: #4466f2 !important;
}

.button-home .btn-home {
  background-color: #2e3094;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}
.button-home .btn-home:hover {
  background-color: #ed1a29;
}
</style>
