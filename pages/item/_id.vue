<template>
  <div>
    {{ data }}
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
