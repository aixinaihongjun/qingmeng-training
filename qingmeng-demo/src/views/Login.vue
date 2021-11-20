<template>
  <!-- Info Section -->
  <div class="login-section">
    <div
      class="image-layer"
      style="background-image: url(images/background/12.jpg)"
    ></div>
    <div class="outer-box">
      <!-- Login Form -->
      <div class="login-form default-form">
        <div class="form-inner">
          <h3>登录账户</h3>
          <!--Login Form-->
          <form method="post">
            <div class="form-group">
              <label>用户名</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                v-model="username"
                required
              />
            </div>

            <div class="form-group">
              <label>密码</label>
              <input
                id="password-field"
                type="password"
                name="password"
                v-model="password"
                placeholder="Password"
              />
            </div>

            <div class="form-group">
              <div class="field-outer">
                <router-link class="pwd" to="/chooseIdentity"
                  >去注册 &gt;&gt;</router-link
                >
                <div class="pwd">忘记密码？</div>
              </div>
            </div>

            <div class="form-group">
              <button
                class="theme-btn btn-style-one"
                type="button"
                name="log-in"
                @click="doLogin"
              >
                登录
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--End Login Form -->
    </div>
  </div>
  <!-- End Info Section -->
</template>

<script>
import { setToken, setUserInfo } from "@/utils/auth";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      redirect: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["login"]),
    doLogin() {
      this.axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          let { token, tokenHead } = res;

          this.login(tokenHead + " " + token);

          this.$router.push({
            path: this.redirect || "/workbench/dashboard",
          });
          
          /* let { state, token, userId } = res;
          if (state == "success") {
            alert("登录成功");

            this.login({
              token,
              userId
            });

            this.$router.push({
              path: this.redirect || "/workbench/dashboard",
            });
          } else {
            alert("登录失败");
          } */
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>