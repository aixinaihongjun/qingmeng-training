<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/about">
        <button type="button" class="btn btn-primary mr-1">About</button>
      </router-link>
      <router-link to="/album">
        <button type="button" class="btn btn-primary ml-1">Album</button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
