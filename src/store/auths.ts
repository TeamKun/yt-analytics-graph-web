import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import firebase from 'firebase'

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'auths' })
export default class Auths extends VuexModule {
  private uid: string | null = null
  private displayName : string | null = null

  @Action
  setUser(user: firebase.User | null | undefined) {
    this.setUid(user?.uid ?? null)
    this.setDisplayName(user?.displayName ?? null)
  }

  @Mutation
  setUid(payload: string | null) {
    this.uid = payload
  }

  @Mutation
  setDisplayName(payload: string | null) {
    this.displayName = payload
  }

  get isAuthenticated() {
    return !!this.uid
  }

  get getUid() {
    return this.uid
  }

  get getDisplayName() {
    return this.displayName
  }
}
