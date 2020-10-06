<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="this.$store.state.memArray"
      item-key="memId"
      class="elevation-1"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
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
    ]
  })
}
</script>

<style>

</style>
