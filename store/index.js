
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
  memtype: 2, /// 2คือลูกค้าทั่วไป 1 พนักงาน 0เจ้าของ
  repairID: 1,
  repairarray: []
})

export const mutations = {
  emPlus (state) {
    state.emID = state.emID + 1
  },
  memIdInc (state) {
    state.memid++
  },
  regis (state, array) {
    state.memArray = array
  },
  emdataget (state, array) {
    state.emArray = array
  },
  addItem (state, array) {
    state.itemArray = array
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
  },
  isLogout (state) {
    state.isLogin = false
    state.currentmember = null
  },
  login2 (state) {
    state.isLogin = true
  },
  repairAdd (state) {
    state.repairID++
  },
  adddatarepair (state, array) {
    state.repairarray = array
  }
}
