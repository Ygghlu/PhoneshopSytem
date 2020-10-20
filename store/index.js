
export const state = () => ({
  memid: 1,
  memArray: [],
  itemArray: [],
  itemId: 1,
  emID: 1,
  emArray: [],
  isGetdata: false,
  isLogin: false,
  currentmember: null,
  memtype: 2 /// 2คือลูกค้าทั่วไป 1 พนักงาน 0เจ้าของ
})

export const mutations = {
  emPlus (state) {
    state.emID = state.emID + 1
  },
  memIdInc (state) {
    state.memid++
  },
  regis (state, array) {
    state.memArray.push(array)
  },
  emdataget (state, array) {
    state.emArray.push(array)
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
  login (state, data) {
    state.isLogin = true
    state.currentmember = data
  },
  owner (state) {
    state.memtype = 0
  },
  employee (state) {
    state.memtype = 1
  }
}
