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
    <v-textarea
      v-model="desc"
      name="input-7-1"
      label="Description"
      value=""
      hint="รุ่นอะไร อาการเป็นอย่างไร เสียตรงไหน ต้องซ่อมอย่างไร"
      outlined
    />
    <v-col sm="6">
      <v-text-field
        v-model="contact"
        label="Contact info"
        outlined
        hint="ข้อมูลการติดต่อเจ้าของ"
      />
    </v-col>
    <v-btn @click="addRepair()">
      บันทึกข้อมูล
    </v-btn>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    desc: '',
    id: null,
    status: 'รับเข้าระบบ',
    contact: null
  }),
  mounted () {
    this.id = this.$store.state.repairID
  },
  methods: {
    addRepair () {
      const dataRepair = {
        repairID: this.id,
        status: this.status,
        desc: this.desc,
        contact: this.contact
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
