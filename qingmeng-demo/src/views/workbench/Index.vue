
<template>
  <div class="workbench-wrapper">
		<UserSidebar></UserSidebar>

    <section class="user-dashboard">
      <!--      <div class="dashboard-outer">-->
      <router-view />
      <!--      </div>-->
    </section>
  </div>
</template>

<script>
	import UserSidebar from "./components/UserSidebar.vue";

export default {
  name: "Workbench",
  data() {
    return {};
  },
  components: {
      UserSidebar
  },
  methods: {},
  created() {},
};
</script>

<style>
</style>
