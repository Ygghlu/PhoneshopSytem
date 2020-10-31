<template>
  <div>
    <v-container>
      <v-col sm="3">
        <v-text-field v-model="date" label="Date" readonly outlined />
      </v-col>
      <span>สินค้าที่ขายได้</span>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="saleItem"
          :items="items"
          item-text="info"
          item-value="itemID"
          label="สินค้า"
          outlined
          @change="getcurrent ()"
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          v-model.number="quantity"
          :rules="rules"
          type="number"
          label="จำนวน"
          outlined
          @input="calPrice()"
        />
      </v-col>
      <v-col sm="3">
        <v-text-field v-model="price" label="Total Price" readonly outlined />
      </v-col>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            save
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Confirm?
          </v-card-title>
          <v-card-text>ข้อมูลถูกต้องแล้วใช่มั้ย?</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              ยกเลิก
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              to="/addItemSuccess"
              @click="dialog = false,savedata()()"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    date: '',
    itemsarray: null,
    items: [],
    saleItem: null,
    quantity: 0,
    price: 0,
    data: null,
    maxQuan: 5,
    dialog: false,
    rules: [
      v => !!v || 'Required',
      v => v >= 0 || 'Quantity should be above 0',
      v => v <= 5 || 'เกินจำนวนในสต๊อค'
    ],
    currentItem: { inStock: 0 },
    todaysale: [],
    count: 1
  }),
  mounted () {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = today.getFullYear()

    today = dd + '-' + mm + '-' + yyyy
    this.date = today
    this.itemsarray = this.$store.state.itemArray
    const array = []
    for (const data in this.itemsarray) {
      if (this.itemsarray[data].inStock > 0) {
        const item = {
          itemID: this.itemsarray[data].itemId,
          info: `${this.itemsarray[data].brand} ${this.itemsarray[data].Model} จำนวนทั้งหมด ${this.itemsarray[data].inStock} เครื่อง`
        }
        array.push(item)
      }
    }
    this.items = array
    this.getdata()
  },
  methods: {
    getcurrent () {
      for (const data in this.itemsarray) {
        if (this.itemsarray[data].itemId === this.saleItem) {
          this.currentItem = this.itemsarray[data]
          this.maxQuan = this.currentItem.inStock
          this.rules = [
            v => !!v || 'Required',
            v => v >= 0 || 'Quantity should be above 0',
            v => v <= this.maxQuan || 'เกินจำนวนในสต๊อค'
          ]
        }
      }
    },
    calPrice () {
      this.price = this.quantity * this.currentItem.Price
    },
    savedata () {
      const data = {
        date: this.date,
        item: `${this.currentItem.brand} ${this.currentItem.Model}`,
        quantity: this.quantity,
        total: this.price,
        no: this.count
      }
      db.collection('Sale')
        .doc(`sale_${this.date}_${this.count}`)
        .set(data, { merge: true })
        .then(() => {
          console.log('Document successfully written! ')
          this.editnumber()
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    getdata () {
      db.collection('Sale')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.todaysale = data
          this.count = 1
          for (const num in this.todaysale) {
            if (this.date === this.todaysale[num].date) {
              this.count += 1
            }
          }
        })
    },
    editnumber () {
      const left = this.currentItem.inStock - this.quantity
      db.collection('Phone')
        .doc(`phone${this.currentItem.itemId}`)
        .update({ inStock: left })
        .then(function () {
          console.log('Document successfully written! ')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>
