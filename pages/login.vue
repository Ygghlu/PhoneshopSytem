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
        {{ userIs }}
        {{ id }}
        {{ password }}
        {{ test }}
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="primary"
              :loading="loading3"
              :disabled="loading3"
              v-bind="attrs"
              @click="checkUser()"
              v-on="on"
            >
              Submit
            </v-btn>
            <v-btn to="/Register">
              Not a Member? Register
            </v-btn>
          </template>
          <v-card v-if="userIs">
            <v-card-title class="headline">
              Login Success
            </v-card-title>
            <v-card-text>Welcome!</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="red darken-1"
                text
                :to="{ name: 'user-id', params: { id: test }}"
                @click="dialog = false,isLogin()"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title class="headline">
              Wrong Username or password
            </v-card-title>
            <v-card-text>Please Re-login</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="red darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
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
    loading3: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    userIs: false,
    valid: true,
    mem: null,
    test: []
  }),
  created () {
    this.mem = this.$store.state.memArray
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    isLogin () {
      this.$store.commit('login', this.test)
    },
    checkUser () {
      for (const user in this.mem) {
        if (this.mem[user].email === this.id && this.mem[user].password === this.password) {
          this.test = this.mem[user]
          this.userIs = true
        }
      }
      firebase.auth().signInWithEmailAndPassword(this.id, this.password)
    }
  }
}
</script>
