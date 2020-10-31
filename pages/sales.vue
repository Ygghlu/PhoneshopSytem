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
        />
      </v-col>
      <v-col sm="3">
        <v-text-field v-model.number="quantity" :rules="rules" type="number" label="จำนวน" outlined />
      </v-col>
      {{ saleItem }}
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: '',
    itemsarray: null,
    items: [],
    saleItem: null,
    quantity: 0,
    price: 0,
    data: null,
    rules: [
      v => !!v || 'Required',
      v => v >= 0 || 'Quantity should be above 0',
      v => v <= 5 || 'เกินจำนวนในสต๊อค'
    ],
    maxQuan: 0
  }),
  mounted () {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = today.getFullYear()

    today = dd + '/' + mm + '/' + yyyy
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
  }
}
</script>
