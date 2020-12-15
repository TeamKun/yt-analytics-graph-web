import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auths from '~/store/auths'

// eslint-disable-next-line import/no-mutable-exports ← 必要であれば
let authsStore: Auths
// let someStore: Something

function initializeStores(store: Store<any>): void {
  authsStore = getModule(Auths, store)
  // someStore = getModule(Something, store)
}

export { initializeStores, authsStore /*, someStore*/ }
