<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f7f7f7;
  font-size: 20px;
}
body {
  background: #c1a6a6;
  margin: 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #967878;
  min-height: 100vh;
  padding: 0px 25px;
  box-sizing: border-box;
}

.mb0 {
  margin-bottom: 0 !important;
}
.mt0 {
  margin-top: 0 !important;
}
</style>