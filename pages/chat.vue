<template>
  <v-container>
    <template>
      <v-timeline>
        <v-timeline-item v-for="item in chatItem" :key="item.messageID" class="text-right">
          {{ item.text }}
        </v-timeline-item>
        <v-timeline-item>timeline item</v-timeline-item>
        <v-timeline-item class="text-right">
          timeline item2
        </v-timeline-item>
        <v-timeline-item>timeline item</v-timeline-item>
      </v-timeline>
    </template>
  </v-container>
</template>

<script>
export default {
  data () {
    return ({
      chatItem: [{ messageID: 1, text: 'TEXT', messagetype: 1 }, { messageID: 2, text: 'TEXT3', messagetype: 2 }, { messageID: 2, text: 'TEXT2', messagetype: 1 }]
    })
  }
}
</script>
