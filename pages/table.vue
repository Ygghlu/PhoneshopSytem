<template>
  <div>
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
    <v-container v-if="this.$store.state.memtype==1">
      <h1>Account Table</h1>
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
      { text: 'Birth Day', value: 'birthdate' },
      { text: 'Gender', value: 'gender' },
      { text: 'E-mail', value: 'email' }
      // { text: 'Password', value: 'password' }
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
      { text: 'Position', value: 'position' },
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
    ]
  })
}
</script>

<style>

</style>
