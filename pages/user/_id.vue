<template>
  <div>
    <h1>welcome {{ data.name }}</h1>
    Login {{ this.$store.state.isLogin }}
    {{ data }}
  </div>
</template>
<script>
export default {
  data: () => ({
    data: null
  }),
  created () {
    this.data = this.$store.state.currentmember
  }
}
</script>
