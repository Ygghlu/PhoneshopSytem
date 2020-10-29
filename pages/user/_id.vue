<template>
  <div>
    <h1>welcome {{ data.name }}</h1>
    Login {{ this.$store.state.isLogin }}
    {{ data }}
    {{ name }}
    {{ email }}
    {{ memtype }}
    <v-btn v-if="memtype == 0" to="/addEmploy" info>
      add employee
    </v-btn>
    <v-btn v-if="memtype != 2" to="/addRepair">
      add Repair
    </v-btn>
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    data: null,
    name: '',
    email: '',
    memtype: null
  }),
  created () {
    this.data = this.$store.state.currentmember
    const user = firebase.auth().currentUser
    this.memtype = this.$store.state.memtype

    if (user != null) {
      this.name = user.displayName
      this.email = user.email
      this.emailVerified = user.emailVerified
    }
    if (this.data.memtype === 0) {
      this.$store.commit('owner')
    } else if (this.data.memtype === 1) {
      this.$store.commit('employee')
    }
  }
}
</script>
