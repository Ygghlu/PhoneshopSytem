<template>
  <div>
    <v-container id="saleTable">
      <v-col>
        <h1>Sale Table for</h1>
        <v-col sm="6">
          <v-text-field v-model="date" hint="Input in dd-mm-yyyy format" @input="getdata()" />
        </v-col>
      </v-col>

      <v-data-table
        dense
        :headers="headersSale"
        :items="todaysale"
        item-key="no"
        class="elevation-1"
      />
      <br>
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              summary
            </div>
            <v-list-item-title class="headline mb-1">
              รายได้ {{ totalrevenue }} บาท
            </v-list-item-title>
            <v-list-item-subtitle>ขายมือถือได้ {{ totalsale }} เครื่อง</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            @click="printDiv('saleTable')"
          >
            Button
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container>
      <h1>Member Table</h1>
      <v-data-table
        dense
        :headers="headersMem"
        :items="this.$store.state.memArray"
        item-key="memId"
        class="elevation-1"
      />
    </v-container>
    <v-container>
      <h1>Item Table</h1>
      <v-data-table
        dense
        :headers="headerItem"
        :items="this.$store.state.itemArray"
        item-key="itemId"
        class="elevation-1"
      />
    </v-container>
    <v-container>
      <h1>Employee Table</h1>
      <v-data-table
        dense
        :headers="headersEmploy"
        :items="this.$store.state.emArray"
        item-key="emId"
        class="elevation-1"
      />
    </v-container>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    headersMem: [
      {
        text: 'ID',
        align: 'start',
        value: 'memId'
      },
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Last Name',
        value: 'lastname'
      },
      { text: 'Phone number', value: 'phone' },
      { text: 'Gender', value: 'gender' },
      { text: 'E-mail', value: 'email' }
      // { text: 'Password', value: 'password' }
    ],
    headersSale: [
      {
        text: 'Number',
        align: 'start',
        value: 'no'
      },
      {
        text: 'Item',
        value: 'item'
      },
      {
        text: 'Quantity',
        value: 'quantity'
      },
      { text: 'Total', value: 'total' }
    ],
    headersEmploy: [
      {
        text: 'ID',
        align: 'start',
        value: 'emId'
      },
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Last Name',
        value: 'lastname'
      },
      { text: 'Gender', value: 'gender' },
      { text: 'Salary(Baht)', value: 'salary' },
      { text: 'E-mail', value: 'email' }
      // { text: 'Password', value: 'password' }
    ],
    headerItem: [
      {
        text: 'Item ID',
        align: 'start',
        value: 'itemId'
      },
      {
        text: 'Model',
        value: 'Model'
      },
      {
        text: 'Brand',
        value: 'brand'
      },
      { text: 'Screen Size', value: 'ScreenSize' },
      { text: 'CPU', value: 'CPU' },
      { text: 'Memory', value: 'Memory' },
      { text: 'FrontCamera(MP)', value: 'FrontCamera' },
      { text: 'BackCamera(MP)', value: 'BackCamera' },
      { text: 'Connection Ports', value: 'ConnectionPorts' },
      { text: 'SimCard', value: 'SimCard' },
      { text: 'Water Resistant', value: 'WaterResistant' },
      { text: 'Wireless Charging', value: 'WirelessCharging' },
      { text: 'Battery Life', value: 'BatteryLife' },
      { text: 'Operating System', value: 'OperatingSystem' },
      { text: 'Color', value: 'Color' },
      { text: 'Quantity in Stock', value: 'inStock' },
      { text: 'Weight', value: 'Weight' },
      { text: 'Warranty', value: 'Warranty' },
      { text: 'Charging', value: 'Charging' },
      { text: 'Battery Life', value: 'Battery' },
      { text: 'Network', value: 'Network' },
      { text: 'Expandable memory slot', value: 'expandable' },
      { text: 'Price(Baht)', value: 'Price' },
      { text: 'Pic', value: 'pic' }
    ],
    todaysale: [],
    salearray: [],
    date: null,
    totalsale: 0,
    totalrevenue: 0
  }),
  mounted () {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = today.getFullYear()

    today = dd + '-' + mm + '-' + yyyy
    this.date = today
    this.getdata()
  },
  methods: {
    getdata () {
      db.collection('Sale')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.salearray = data
          this.todaysale = []
          this.totalsale = 0
          this.totalrevenue = 0
          for (const num in this.salearray) {
            if (this.date === this.salearray[num].date) {
              this.todaysale.push(this.salearray[num])
              this.totalsale += this.salearray[num].quantity
              this.totalrevenue += this.salearray[num].total
            }
          }
        })
    },
    printDiv (divName) {
      const printContents = document.getElementById(divName).innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents

      window.print()

      document.body.innerHTML = originalContents
    }
  }
}
</script>

<style>

</style>
