<template>
  <v-flex class="text-center">
    <div class="container">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <div class="row">
          <div class="form-group col-md-6">
            <v-text-field
              v-model="id"
              label="ID / E-mail"
              :rules="emailRules"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            />
          </div>
        </div>
      </v-form>
      <v-btn v-if="userIs" @click="checkUser()" :to="{name:'user-id'}" >
        login
      </v-btn>
      <v-col>
        <v-btn v-if="!userIs" @click="checkUser(),show=!show">
          login
        </v-btn>
        <v-tooltip
          v-model="show"
          top
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="grey lighten-1" hidden>
                mdi-cart
              </v-icon>
            </v-btn>
          </template>
          <span>{{ error }}</span>
        </v-tooltip>
      </v-col>
    </div>
  </v-flex>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    array: [],
    id: '',
    password: '',
    dialog: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    userIs: false, // ไม่เจอข้อมูล
    mem: null,
    usernow: [],
    employ: null,
    error: null,
    show: false
  }),
  mounted () {
    this.mem = this.$store.state.memArray
    this.employ = this.$store.state.emArray
  },
  methods: {
    checkUser () {
      for (const user in this.mem) {
        if (this.mem[user].email === this.id) {
          this.usernow = this.mem[user]
          this.$store.commit('login', this.usernow)
          this.userIs = true
        }
      }
      for (const user in this.employ) {
        if (this.employ[user].email === this.id) {
          this.usernow = this.employ[user]
          this.$store.commit('login', this.usernow)
          this.userIs = true
        }
      }
      firebase.auth().signInWithEmailAndPassword(this.id, this.password).then(this.userIs = true).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        this.userIs = false
        this.error = errorCode + errorMessage
        console.log(errorCode, errorMessage)
        // ...
      })
    }
  }
}
</script>
