<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    this.qq();
  },
  methods: {
    qq() {
      let params = {
        providerId: 1028128481,
      };
      this.$http
        .get("api/data.js", params)
        .then((res) => {
          this.url = res.url;
          console.log(res);
        });
    },
  },
  components: {
    HelloWorld,
  },
};
</script>
