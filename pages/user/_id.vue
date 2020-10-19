<template>
  <div>
    <h1>welcome {{ data.name }}</h1>
    Login {{ this.$store.state.isLogin }}
    {{ data }}
    {{ name }}
    {{ email }}
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    data: null,
    name: '',
    email: ''
  }),
  created () {
    this.data = this.$store.state.currentmember
    const user = firebase.auth().currentUser

    if (user != null) {
      this.name = user.displayName
      this.email = user.email
      this.emailVerified = user.emailVerified
    }
  }
}
</script>
