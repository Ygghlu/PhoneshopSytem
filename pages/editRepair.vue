<template>
  <v-container>
    <v-col sm="6">
      <v-text-field
        :value="data.repairID"
        label="repairID"
        outlined
        readonly
        hint="Read Only"
      />
    </v-col>
    <v-col sm="6">
      <v-select
        v-model="status"
        :items="items"
        label="Status"
        outlined
      />
    </v-col>
    <v-col class="d-flex" cols="12" sm="6">
      <v-text-field
        v-model="data.contact"
        readonly
        outlined
      />
    </v-col>
    <v-col sm="6">
      <v-text-field
        :value="data.phone"
        label="Model"
        outlined
        readonly
      />
    </v-col>
    <v-textarea
      v-model="desc"
      name="input-7-1"
      label="Description"
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
              @click="dialog = false,update()"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red"
            dark
            v-bind="attrs"
            v-on="on"
          >
            delete
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Confirm?
          </v-card-title>
          <v-card-text>ต้องการลบข้อมูลใช่มั้ย?</v-card-text>
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
              @click="dialog = false,deleteItem()"
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
// eslint-disable-next-line no-unused-vars
import {
  db
} from '~/plugins/firebaseConfig.js'
export default {
  data: () => ({
    data: null,
    items: ['อยู่ระหว่างการซ่อมแซม', 'ซ่อมแซมเสร็จสิ้น', 'ปัญหาอื่นๆ กรุณาติดต่อร้านค้า'],
    status: '',
    desc: '',
    dialog: false
  }),
  mounted () {
    this.data = this.$route.params.item
    this.desc = this.data.desc
  },
  methods: {
    update () {
      db.collection('Repair')
        .doc(`repair${this.data.repairID}`)
        .update({
          status: this.status,
          desc: this.desc
        })
        .then(() => {
          console.log('Document successfully update ')
          this.$router.replace('/addItemSuccess')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$router.replace('addItemSuccess')
    },
    deleteItem () {
      db.collection('Repair')
        .doc(`repair${this.data.repairID}`)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.$router.replace('/')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
      this.$router.replace('addItemSuccess')
    }
  }
}
</script>
