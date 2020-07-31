const state = {
  menus: {
    basePath: '',
    children: []
  }
}

const mutations = {
  SET_MENUS: (state, menu) => {
    state.menus = menu
  }
}

const actions = {
  setMenu({ commit }, menu) {
    commit('SET_MENUS', menu)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
