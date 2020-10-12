
export const state = () => ({
  memid: 1,
  memArray: [],
  itemArray: [],
  itemId: 1,
  emID: 1,
  emArray: [{ emId: 0, name: 'John', lastname: 'Doe', position: 'Owner', salary: 'Infinite', email: 'A@B.c', password: 'inwza007' }],
  isGetdata: false
})

export const mutations = {
  increment (state) {
    state.memid++
  },
  regis (state, array) {
    state.memArray.push(array)
  },
  addItem (state, array) {
    state.itemArray.push(array)
  },
  itemIdAdd (state) {
    state.itemId++
  },
  getdatanow (state) {
    state.isGetdata = true
  }
}
