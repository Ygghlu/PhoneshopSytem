/* eslint-disable quote-props */
<template>
  <v-container>
    <v-flex class="text-center">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935878267568149/1plus.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935883040292874/apple.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935883715706890/ASUS.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935885863714836/nokia.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935886123761664/huawei.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935887343910912/oppo.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935889055449128/pixel.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935890376916992/realme.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935892046118932/samsung.png" height="90" width="90">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762935893702606848/sony.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762936137077358602/xiaomi.png" height="85" width="85">
      <img src="https://cdn.discordapp.com/attachments/762935827121700874/762936140994445342/vivo.png" height="85" width="85">
    </v-flex>
    <!-- แบบฟอร์มกรอกข้อมูล -->
    <!-- ชนิดโทรศัพท์ -->
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="12" required>
          <v-select v-model="brand" :items="items" label="Mobile Phone Brand" filled />
        </v-col>
      </v-row>
      <v-row>
        <!-- ชื่อรุ่น -->
        <v-col cols="12" md="10">
          <v-text-field v-model="Model" :rules="nameRules" label="Model Name" required />
        </v-col>
      </v-row>
    </v-container>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <!-- ไซส์หน้าจอ -->
          <v-col cols="12" md="4">
            <v-text-field v-model="ScreenSize" :rules="nameRules" label="Screen Size(inch)" required />
          </v-col>

          <!-- ชิป -->
          <v-col cols="12" md="8">
            <v-text-field v-model="Chip" :rules="nameRules" label="CPU" required />
          </v-col>

          <!-- หน้าจอ -->
          <v-col cols="12" md="6">
            <v-text-field v-model="Display" :rules="nameRules" label="Display" required />
          </v-col>

          <!-- ความจุ -->
          <v-col cols="12" md="6">
            <v-text-field v-model="Memory" :rules="nameRules" label="Memory" required />
          </v-col>

          <!-- กล้องหน้า -->
          <v-col cols="12" md="6">
            <v-text-field v-model="FrontCamera" :rules="nameRules" label="Front Camera(MP)" required />
          </v-col>

          <!-- กล้องหลัง -->
          <v-col cols="12" md="6">
            <v-text-field v-model="BackCamera" :rules="nameRules" label="Back Camera(MP)" required />
          </v-col>

          <!-- พอร์ตเชื่อมต่อ -->
          <v-col cols="12" md="2">
            <v-text-field v-model="ConnectionPorts" :rules="nameRules" label="Connection Ports" required />
          </v-col>

          <!-- ซิมการ์ด -->
          <v-col cols="12" md="5">
            <v-text-field v-model="SimCard" :rules="nameRules" label="Sim Card" required />
          </v-col>

          <!-- กันน้ำ -->
          <v-col cols="12" md="5">
            <v-text-field v-model="WaterResistant" :rules="nameRules" label="Water Resistant" required />
          </v-col>

          <!-- การชาร์จแบบไร้สาย -->
          <v-col cols="12" md="6">
            <v-text-field v-model="WirelessCharging" :rules="nameRules" label="Wireless Charging" required />
          </v-col>

          <!-- อายุแบตเตอรี่ -->
          <v-col cols="12" md="6">
            <v-text-field v-model="BatteryLife" :rules="nameRules" label="Battery Life" required />
          </v-col>

          <!-- ระบบปฏิบัติการ -->
          <v-col cols="12" md="3">
            <v-text-field v-model="OperatingSystem" :rules="nameRules" label="Operating System" required />
          </v-col>

          <!-- สี -->
          <v-col cols="12" md="3">
            <v-text-field v-model="Color" :rules="nameRules" label="Color" required />
          </v-col>

          <!-- จำนวน -->
          <v-col cols="12" md="6">
            <v-text-field v-model="quantity" type="number" :rules="nameRules" label="Quantity in Stock" required />
          </v-col>

          <!-- ขนาดกว้าง x ลึก x สูง -->
          <v-col cols="12" md="6">
            <v-text-field v-model="Dimensions" :rules="nameRules" label="Dimensions W x D x H(cm.)" required />
          </v-col>

          <!-- น้ำหนัก -->
          <v-col cols="12" md="3">
            <v-text-field v-model="Weight" :rules="nameRules" label="Weight(Kg.)" required />
          </v-col>

          <!-- ประกัน -->
          <v-col cols="12" md="3">
            <v-text-field v-model="Warranty" :rules="nameRules" label="Warranty(Year)" required />
          </v-col>

          <!-- การชาร์จ -->
          <v-col cols="12" md="7">
            <v-text-field v-model="Charging" :rules="nameRules" label="Charging" required />
          </v-col>

          <!-- แบตเตอรี่ -->
          <v-col cols="12" md="5">
            <v-text-field v-model="Battery" :rules="nameRules" label="Battery(mAh)" required />
          </v-col>

          <!-- Network -->
          <v-col cols="12" md="5">
            <v-text-field v-model="Network" :rules="nameRules" label="Network" required />
          </v-col>

          <!-- หน่วยความจำและซิมการ์ดที่ขยายได้ -->
          <v-col cols="12" md="5">
            <v-text-field v-model="upmemory" :rules="nameRules" label="Expandable Memory and Sim Card" required />
          </v-col>

          <!-- ราคา -->
          <v-col cols="12" md="2">
            <v-text-field v-model="Price" type="number" :rules="nameRules" label="Price(Baht)" required />
          </v-col>

          <!-- submit -->
          <v-container fluid>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  depressed
                  color="primary"
                  :disabled="!valid"
                  class="mr-4"
                  v-bind="attrs"
                  @click="validate()"
                  v-on="on"
                >
                  Submit
                </v-btn>
              </template>
              <v-card v-if="va=true">
                <v-card-title class="headline grey lighten-2">
                  Confirm Submit?
                </v-card-title>

                <v-card-text>
                  Submit?
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" text to="/addItemSuccess" @click="dialog = false,submit(),reset (),resetValidation ()">
                    Finish
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
// eslint-disable-next-line no-unused-vars
import {
  db
} from '~/plugins/firebaseConfig.js'

export default {
  data: () => ({
    data: null,
    dialog: false,
    brand: '',
    valid: true,
    ScreenSize: '',
    Chip: '',
    Display: '',
    Memory: '',
    FrontCamera: '',
    BackCamera: '',
    ConnectionPorts: '',
    SimCard: '',
    WaterResistant: '',
    WirelessCharging: '',
    BatteryLife: '',
    OperatingSystem: '',
    Color: '',
    quantity: '',
    Dimensions: '',
    Weight: '',
    Warranty: '',
    Charging: '',
    Battery: '',
    Network: '',
    upmemory: '',
    Model: '',
    Price: '',
    array: null,
    pic: null,
    picurl: null,
    isUploadingImage: false,
    blog: {},
    isDeletingImage: false,
    items: ['Oneplus', 'Huawei', 'Nokia', 'Oppo', 'Samsung', 'Vivo', 'Xiaomi', 'Apple', 'Realme', 'Sony', 'Asus', 'Pixel'],
    nameRules: [
      v => !!v || 'Required'
    ]

  }),
  created () {
    this.data = this.$route.params.item
    this.Model = this.data.Model
    this.brand = this.data.brand
    this.ScreenSize = this.data.ScreenSize
    this.Chip = this.data.CPU
    this.Display = this.data.Display
    this.Memory = this.data.Memory
    this.FrontCamera = this.data.FrontCamera
    this.BackCamera = this.data.BackCamera
    this.ConnectionPorts = this.data.ConnectionPorts
    this.SimCard = this.data.SimCard
    this.WaterResistant = this.data.WaterResistant
    this.WirelessCharging = this.data.WirelessCharging
    this.BatteryLife = this.data.BatteryLife
    this.OperatingSystem = this.data.OperatingSystem
    this.Color = this.data.Color
    this.quantity = this.data.inStock
    this.Dimensions = this.data.Dimensions
    this.Weight = this.data.Weight
    this.Warranty = this.data.Warranty
    this.Charging = this.data.Charging
    this.Battery = this.data.Battery
    this.Network = this.data.Network
    this.upmemory = this.data.expandable
    this.Price = this.data.Price
    this.picurl = this.data.picurl
  },
  methods: {
    submit () {
      db.collection('Phone').doc(`phone${this.data.itemId}`).update({
        itemId: this.data.itemId,
        Model: this.Model,
        brand: this.brand,
        ScreenSize: this.ScreenSize,
        CPU: this.Chip,
        Display: this.Display,
        Memory: this.Memory,
        FrontCamera: this.FrontCamera,
        BackCamera: this.BackCamera,
        ConnectionPorts: this.ConnectionPorts,
        SimCard: this.SimCard,
        WaterResistant: this.WaterResistant,
        WirelessCharging: this.WirelessCharging,
        BatteryLife: this.BatteryLife,
        OperatingSystem: this.OperatingSystem,
        Color: this.Color,
        inStock: this.quantity,
        Dimensions: this.Dimensions,
        Weight: this.Weight,
        Warranty: this.Warranty,
        Charging: this.Charging,
        Battery: this.Battery,
        Network: this.Network,
        expandable: this.upmemory,
        Price: this.Price,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(function () {
          console.log('Document successfully updated!')
        })
    },
    validate () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.va = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style>
.theme--dark.v-application {
    font-family: 'Sarala', sans-serif;
    background-image: url('https://images.wallpaperscraft.com/image/dark_spots_texture_background_50355_1280x720.jpg');
    background-attachment: fixed;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
