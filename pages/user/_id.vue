<template>
  <div>
    <h1>welcome {{ data.name }}</h1>
    <!-- Login {{ this.$store.state.isLogin }} -->
    <!--     {{ data }}
    {{ name }}
    {{ email }}
    {{ memtype }} -->
    <v-container v-if="memtype==2">
      <v-col
        v-for="card in repairArray"
        :key="card.repairID"
      >
        <v-card
          v-if="card.memId==data.memId"
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <p class="display-1 text--primary">
              มือถือที่ส่งซ่อม
            </p>
            <p class="text--primary">
              {{ card.phone }}
            </p>
            <p class="text--primary">
              {{ card.desc }}
            </p>
            <div class="text--primary">
              Status: {{ card.status }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
    <v-btn v-if="memtype == 0" to="/addEmploy" info>
      add employee
    </v-btn>
    <v-btn v-if="memtype == 0" to="/table" info>
      ตารางสรุป
    </v-btn>
    <v-btn v-if="memtype != 2" to="/addRepair">
      add Repair
    </v-btn>
    <v-btn v-if="memtype != 2" to="/sales">
      บันทึกข้อมูลการขาย
    </v-btn>
    <v-btn v-if="memtype != 2" to="/employeeviewrepair">
      ดู/แก้ไข บันทึกมือถือที่ส่งซ่อม
    </v-btn>
    <v-btn v-if="memtype != 2" to="/ItemAdd">
      บันทึกข้อมูลมือถือ
    </v-btn>
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    data: null,
    name: '',
    email: '',
    memtype: null,
    repairArray: []
  }),
  created () {
    this.data = this.$store.state.currentmember
    const user = firebase.auth().currentUser
    this.memtype = this.data.memtype
    this.repairArray = this.$store.state.repairarray

    if (user != null) {
      this.name = user.displayName
      this.email = user.email
      this.emailVerified = user.emailVerified
    }
    if (this.data.memtype === 0) {
      this.$store.commit('owner')
    } else if (this.data.memtype === 1) {
      this.$store.commit('employee')
    }
  }
}
</script>
