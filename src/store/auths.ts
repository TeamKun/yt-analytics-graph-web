import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import firebase from 'firebase'

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'auths' })
export default class Auths extends VuexModule {
  private user: firebase.User | null = null

  @Mutation
  setUser(payload: firebase.User | null) {
    this.user = payload
  }

  get isAuthenticated() {
    return !!this.user
  }
}
