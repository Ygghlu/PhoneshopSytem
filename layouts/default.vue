<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn to="/" v-text="title" />
      <v-spacer />
      <v-btn v-if="!this.$store.state.isLogin" to="/login">
        Login <v-icon>mdi-account</v-icon>
      </v-btn>
      <div v-else>
        <v-btn :to="{ name: 'user-id'} ">
          Member <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn @click="logout()">
          Log Out
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </div>

      <v-btn @click="themeswitch ()">
        <v-icon>{{ this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : ' mdi-moon-waning-crescent' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/Register'
        },
        {
          icon: 'mdi-playlist-plus',
          title: 'Item Add',
          to: '/ItemAdd'
        },
        {
          icon: 'mdi-table-large',
          title: 'Table',
          to: '/table'
        },
        {
          icon: 'mdi-table-large',
          title: 'add Repair',
          to: '/addRepair'
        },
        {
          icon: 'mdi-table-large',
          title: 'Repair for employ',
          to: '/employeeviewrepair'
        },
        {
          icon: 'mdi-table-large',
          title: 'sales',
          to: '/sales'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Phone Shop'
    }
  },
  created () {
    const user = firebase.auth().currentUser

    if (user) {
      this.$store.commit('login2')
    } else {
      // No user is signed in.
    }
  },
  methods: {
    themeswitch () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('isLogout')
        this.$router.replace('/')
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
