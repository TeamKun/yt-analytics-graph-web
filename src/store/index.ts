export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state: { user: any }, payload: any) {
    state.user = payload
  },
}

export const actions = {
  setUser({ commit }: any, payload: any) {
    commit('setUser', payload)
  },
}

export const getters = {
  isAuthenticated(state: { user: any }) {
    return !!state.user
  },
}
