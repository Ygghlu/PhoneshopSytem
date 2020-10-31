<template>
  <div>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field v-model="search" label="search Phone" />
      </v-col>
      <v-btn @click="searchData()">
        <v-icon>mdi-magnify</v-icon>CLICK ME
      </v-btn>
    </v-row>
    <v-card class="mx-auto" max-width="1000">
      <v-pagination
        v-model="currentPage"
        :length="searchItem.length/5"
        :per-page="perPage"
      />
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in searchItem.slice(
              (currentPage - 1) * perPage,
              (currentPage - 1) * perPage + perPage
            )"
            :key="card.itemId"
            :cols="card.flex"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img
                contain
                :src="card.pic"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                max-height="300"
              >
                <v-card-title v-text="card.brand + ' ' + card.Model" />
              </v-img>
              <v-card-subtitle>
                <p>สี : {{ card.Color }}</p>
                <p>ราคา: {{ card.Price }} บาท</p>
                <p v-if="card.inStock<=0" class="red--text">
                  สินค้าหมด
                </p>
                <p v-else>
                  จำนวนในสต๊อค: {{ card.inStock }} เครื่อง
                </p>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  v-if="memtype != 2"
                  color="orange lighten-2"
                  text
                  :to="{ name: 'editItem', params: { item: card } }"
                >
                  edit
                </v-btn>
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
    member: null,
    employee: null,
    search: '',
    searchItem: [],
    docID: [],
    memtype: 2,
    perPage: 6,
    currentPage: 1,
    totalRows: 0,
    repair: []
  }),
  mounted () {
  },
  created () {
    this.getData()
    this.get = this.$store.state.isGetdata
    this.array = this.$store.state.itemArray
    if (this.employee != null) {
      this.now()
    }
    this.memtype = this.$store.state.memtype
    this.searchItem = this.array
  },
  methods: {

    getData () {
      if (!this.get) {
        this.get = this.$store.state.isGetdata
        db.collection('Phone')
          .orderBy('itemId')
          .onSnapshot((querySnapshot) => {
            const data = []
            querySnapshot.forEach((doc) => {
              this.$store.commit('itemIdAdd')
              data.push(doc.data())
            })
            this.array = data
            this.$store.commit('addItem', this.array)
          })
        db.collection('Repair')
          .orderBy('repairID')
          .onSnapshot((querySnapshot) => {
            const data = []
            querySnapshot.forEach((doc) => {
              this.$store.commit('repairAdd')
              data.push(doc.data())
            })
            this.repair = data
            this.$store.commit('adddatarepair', this.repair)
          })
        db.collection('User')
          .orderBy('memId')
          .onSnapshot((querySnapshot) => {
            const data = []
            querySnapshot.forEach((doc) => {
              this.$store.commit('memIdInc')
              data.push(doc.data())
            })
            this.member = data
            this.$store.commit('regis', this.member)
          })
        db.collection('employee')
          .orderBy('emId')
          .onSnapshot((querySnapshot) => {
            const data = []
            querySnapshot.forEach((doc) => {
              this.$store.commit('emPlus')
              data.push(doc.data())
            })
            this.employee = data
            this.$store.commit('emdataget', this.employee)
            this.now()
          })
      }
    },
    now () {
      this.$store.commit('getdatanow')
    },
    searchData () {
      this.searchItem = this.array
      this.searchItem = this.searchItem.filter((item) => {
        return (
          item.brand.toLowerCase().match(this.search) ||
          item.Model.toLowerCase().match(this.search)
        )
      })
    }
  }
}
</script>
