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
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              required
            />
          </div>
        </div>
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
              @click="validate(),loader = 'loading3'"
              v-on="on"
            >
              Submit
            </v-btn>
            <v-btn to="/Register">
              Not a Member? Register
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Register Success
            </v-card-title>
            <v-card-text>Welcome to our Web</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="red darken-1"
                text
                :to="{ name: 'user-id', params: { id: memId }}"
                @click="dialog = false,isLogin()"
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
    }
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    isLogin () {
      this.$store.commit('login')
    }
  }
}
</script>
