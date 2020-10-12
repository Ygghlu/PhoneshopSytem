
export const state = () => ({
  memid: 1,
  memArray: [],
  itemArray: [],
  itemId: 1,
  emID: 1,
  emArray: [{ emId: 0, name: 'John', lastname: 'Doe', position: 'Owner', salary: 'Infinite', email: 'A@B.c', password: 'inwza007' }],
  isGetdata: false,
  memtype: 1
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
  },
  memIsOwner (state) {
    state.memtype = 1
  },
  memIsEmmploy (state) {
    state.memtype = 2
  },
  memIsCusto (state) {
    state.memtype = 3
  }
}
