
export const state = () => ({
  memid: 1,
  memArray: []
})

export const mutations = {
  increment (state) {
    state.memid++
  },
  regis (state, array) {
    state.memArray.push(array)
  }
}
