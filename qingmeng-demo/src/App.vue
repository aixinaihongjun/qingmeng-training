<template>
  <div id="app">
    <div v-if="isWorkbench" class="page-wrapper dashboard">
      <!-- Main Header-->
      <main-header :headerClass="headerClass"></main-header>
      <!--End Main Header -->

      <router-view />
    </div>
    <div v-else class="page-wrapper">
      <!-- Main Header-->
      <main-header :headerClass="headerClass"></main-header>
      <!--End Main Header -->

      <router-view />
    </div>
  </div>
</template>
<script>
import MainHeader from "@/components/MainHeader";

export default {
  components: {
    MainHeader,
  },
  data() {
    return {
      headerClass: "",
    };
  },
  computed: {
    isWorkbench() {
      return this.$route.path.includes("workbench");
    },
  },
  mounted() {
    this.handleScroll();
  },
  methods: {
    handleScroll() {
      let htmlDom = document.documentElement;
      window.onscroll = () => {
        if (htmlDom.scrollTop > 0) {
          this.headerClass = "fixed-header animated slideInDown";
        } else {
          this.headerClass = "";
        }
      };
    },
  },
};
</script>

<style lang="scss">
</style>
