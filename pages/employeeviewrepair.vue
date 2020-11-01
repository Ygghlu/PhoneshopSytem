<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in repairArray"
        :key="card.repairID"
      >
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <p class="display-1 text--primary">
              {{ card.phone }}
            </p>
            <p>{{ card.desc }}</p>
            <div class="text--primary">
              Status: {{ card.status }}
            </div>
            <p> {{ card.contact }} </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              :to="{ name: 'editRepair', params: { item: card } }"
            >
              edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    repairArray: []
  }),
  mounted () {
    this.repairArray = this.$store.state.repairarray
  }
}
</script>
