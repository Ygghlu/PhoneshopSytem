<template>
  <v-layout>
    <v-flex class="text-center">
      <div class="container fluid">
        <div>
          <div>
            <div class="card-header">
              <h2>Register</h2>
            </div>
            <div class="card-body">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="row">
                  <div class="form-group col-md-6">
                    <v-text-field v-model="name" label="Name" required />
                  </div>
                  <div class="form-group col-md-6">
                    <v-text-field
                      v-model="lastname"
                      label="Last Name"
                      required
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <v-text-field
                      v-model="phone"
                      label="Phone Number"
                      required
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[(v) => !!v || 'Item is required']"
                      label="Gender"
                      required
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <v-text-field
                      v-model="pass"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="rulespass"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password again"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    />
                  </div>
                </div>
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      color="primary"
                      :loading="loading3"
                      :disabled="loading3"
                      v-bind="attrs"
                      @click="confirm(), (loader = 'loading3')"
                      v-on="on"
                    >
                      Submit
                    </v-btn>
                  </template>
                  <v-card v-if="!dubEmail">
                    <v-card-title class="headline">
                      Register Success
                    </v-card-title>
                    <v-card-text>Welcome to our Web</v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        :to="{ name: 'user-id' }"
                        color="red darken-1"
                        text
                        @click="dialog = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card v-else>
                    <v-card-title class="headline">
                      DuplicateEmail
                    </v-card-title>
                    <v-card-text>
                      This Email already Register with our webside
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="red darken-1"
                        text
                        @click="(dialog = false), (dubEmail = false)"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    valid: true,
    name: '',
    loader: null,
    loading3: false,
    lastname: '',
    email: '',
    date: '',
    menu: false,
    pass: '',
    password: '',
    show1: false,
    dialog: false,
    phone: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    array: null,
    select: null,
    items: ['Male', 'Female', 'Other'],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    },
    dubEmail: false,
    mem: '',
    id: null
  }),
  computed: {
    rulespass () {
      const rules = []

      if (this.min) {
        const rule = v =>
          (v || '').length >= 8 ||
          `A minimum of ${this.max} characters is allowed`

        rules.push(rule)
      }

      if (this.pass) {
        const rule = v => (!!v && v) === this.pass || 'Values do not match'

        rules.push(rule)
      }

      return rules
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)
    },
    pass: 'validate',
    min: 'validate',
    password: 'validate'
  },
  mounted () {
    this.mem = this.$store.state.memArray
    this.id = this.$store.state.memid
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    checkUser () {
      for (const user in this.mem) {
        if (this.mem[user].email === this.email) {
          this.dubEmail = true
        }
      }
    },
    confirm () {
      this.checkUser()
      if (!this.dubEmail) {
        const dataMem = {
          memId: this.$store.state.memid,
          name: this.name,
          lastname: this.lastname,
          phone: this.phone,
          gender: this.select,
          email: this.email,
          memtype: 2
        }
        db.collection('User')
          .doc(`user${this.$store.state.memid}`)
          .set(dataMem)
          .then(function () {
            console.log('Document successfully written! -> MyText')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        this.$store.commit('memIdInc')
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
        this.$store.commit('login', dataMem)
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      }
    }
  }
}
</script>
