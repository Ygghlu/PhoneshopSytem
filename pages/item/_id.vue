<template>
  <div>
    <v-row>
      <v-col>
        <v-img
          contain
          :src="data.pic"
          class="white--text align-end"
        />
      </v-col>
      <v-col>
        <v-row>
          <h1>{{ data.brand+' '+data.Model }}</h1>
        </v-row>
        <P>ขนาดหน้าจอ {{ data.Dimensions }}</P>
        <P>หน้าจอ {{ data.Display }}</P>
        <P>CPU {{ data.CPU }}</P>
        <P>Memory {{ data.Memory }}</P>
        <P>กล้องหน้า {{ data.FrontCamera }}</P>
        <P>กล้องหลัง {{ data.BackCamera }}</P>
        <P>Connection Port {{ data.ConnectionPorts }}</P>
        <P>ระบบปฏิบัติการ {{ data.OperatingSystem }}</P>
        <P>Sims {{ data.SimCard }}</P>
        <P>กันน้ำ {{ data.WaterResistant }}</P>
        <P>น้ำหนัก(g) {{ data.Weight }}</P>
        <P>อายุการใช้งาน {{ data.BatteryLife }}</P>
        <P>แบตเตอรี่ {{ data.Battery }}</P>
        <P>สี {{ data.Color }}</P>
        <P>การชาร์จ {{ data.Charging }}</P>
        <P>เครือข่าย {{ data.Network }}</P>
        <P>Sd card และ slot SIms {{ data.expandable }}</P>
        <P>หน้าจอ {{ data.Display }}</P>
        <P>ราคา {{ data.Price }}</P>
        <P>จำนวน {{ data.inStock }}</P>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: null
  }),
  created () {
    this.data = this.$route.params.item
  }
}
</script>
