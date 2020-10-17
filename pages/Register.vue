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

                  <v-col md="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Birth day"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer />
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
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
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
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
                  <v-card>
                    <v-card-title class="headline">
                      Register Success
                    </v-card-title>
                    <v-card-text>Welcome to our Web</v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn :to="{ name: 'user-id', params: { id: memId }}" color="red darken-1" text @click="dialog = false">
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
    password: '',
    show1: false,
    dialog: false,
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
    checkbox: false
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
      this.valid = true
      this.name = ''
      this.loader = null
      this.loading3 = false
      this.lastname = ''
      this.email = ''
      this.date = ''
      this.menu = false
      this.password = ''
      this.show1 = false
      this.select = null
    }
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
    confirm () {
      const dataMem = {
        memId: this.$store.state.memid,
        name: this.name,
        lastname: this.lastname,
        birthdate: this.date,
        gender: this.select,
        email: this.email,
        password: this.password,
        memtype: 2
      }
      db.collection('User')
        .doc()
        .set(dataMem)
        .then(function () {
          console.log('Document successfully written! -> MyText')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$store.commit('memIdInc')
      this.$store.commit('login', dataMem)
    }
  }
}
</script>
