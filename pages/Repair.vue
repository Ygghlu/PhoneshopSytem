<template>
  <v-container>
    <v-row>
      <v-form>
        <v-text-field v-model="repairID" label="Enter Repair ID" />
      </v-form>
      <v-btn><v-icon>mdi-magnify</v-icon></v-btn>
    </v-row>

    <v-card v-if="repairID">
      <h1>STATUS</h1>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    repairID: ''
  })
}
</script>
