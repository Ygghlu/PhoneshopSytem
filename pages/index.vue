<template>
  <div>
    <v-row justify="center" align="center">
      <v-col>
        <h1>Under Construction</h1>
        {{ array }}
        {{ get }}
        {{ member }}
      </v-col>
    </v-row>
    <v-card
      class="mx-auto"
      max-width="1000"
    >
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in array"
            :key="card.itemId"
            :cols="card.flex"
          >
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-img
                contain
                :src="card.pic"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title v-text="card.brand+' '+card.Model" />
              </v-img>
              <v-card-subtitle>
                <p>สี : {{ card.Color }}  </p>
                <p>ราคา: {{ card.Price }} บาท</p>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  :to="{ name: 'item-id', params: { item: card } }"
                >
                  Explore
                </v-btn>

                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    array: null,
    get: null,
    member: null
  }),
  created () {
    this.get = this.$store.state.isGetdata
    this.array = this.$store.state.itemArray
    this.getData()
    if (this.member != null) {
      this.now()
    }
  },
  methods: {
    // ...........
    getData () {
      if (!this.get) {
        this.get = this.$store.state.isGetdata
        db.collection('Phone').orderBy('itemId').onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            this.$store.commit('itemIdAdd')
            data.push(doc.data())
            this.$store.commit('addItem', doc.data())
          })
          this.array = data
        })
        db.collection('User').orderBy('memId').onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            this.$store.commit('memIdInc')
            data.push(doc.data())
            this.$store.commit('regis', doc.data())
          })
          this.member = data
          this.now()
        })
      }
    },
    now () {
      this.$store.commit('getdatanow')
    }

  }
}
</script>
