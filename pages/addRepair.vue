<template>
  <v-container>
    <v-col sm="6">
      <v-text-field
        :value="id"
        label="repairID"
        outlined
        readonly
        hint="Read Only"
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        :value="status"
        label="repairID"
        outlined
        readonly
        hint="Read Only"
      />
    </v-col>
    <v-col class="d-flex" cols="12" sm="6">
      <v-select
        v-model="contact"
        :items="items"
        item-text="info"
        item-value="memID"
        label="Member"
        outlined
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        :value="model"
        label="Model"
        outlined
        hint="มือถือรุ่นอะไร สีอะไร "
      />
    </v-col>
    <v-textarea
      v-model="desc"
      name="input-7-1"
      label="Description"
      value=""
      hint="อาการเป็นอย่างไร เสียตรงไหน ต้องซ่อมอย่างไร"
      outlined
    />
    <v-row justify="center">
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
              @click="dialog = false,addRepair()"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    desc: '',
    id: null,
    status: 'รับเข้าระบบ',
    contact: 1,
    model: '',
    memArray: null,
    items: [{ memID: 0, info: '1' }],
    info: '',
    dialog: false
  }),
  mounted () {
    this.memArray = this.$store.state.memArray
    this.id = this.$store.state.repairID
    const array = []
    for (const data in this.memArray) {
      const item = {
        memID: this.memArray[data].memId,
        info: `member ID ${this.memArray[data].memId} | ${this.memArray[data].name} | contact: ${this.memArray[data].phone}`
      }
      array.push(item)
    }
    this.items = array
  },
  methods: {
    addRepair () {
      for (const data in this.items) {
        if (this.contact === this.items[data].memID) {
          this.info = this.items[data].info
        }
      }
      const dataRepair = {
        repairID: this.id,
        status: this.status,
        desc: this.desc,
        memId: this.contact,
        contact: this.info,
        phone: this.model
      }
      db.collection('Repair')
        .doc(`repair${this.id}`)
        .set(dataRepair)
        .then(function () {
          console.log('Document successfully written! ')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$store.commit('repairAdd')
    }
  }
}
</script>
