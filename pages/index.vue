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
            <v-card>
              <v-img
                :src="card.pic"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.Model" />
              </v-img>

              <v-card-actions>
                <v-spacer />

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
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
