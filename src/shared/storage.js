/* globals Storage, localStorage, sessionStorage */
// @flow
type Keys<K> = {
  [key: string]: K
}

class Store<K: string> {
  storage: Storage

  constructor (storage: Storage, keys?: Keys<K>) {
    this.storage = storage
  }

  set (key: K, value: ?string) {
    if (value) {
      this.storage.setItem(key, value)
    } else {
      this.storage.removeItem(key)
    }
  }

  get (key: K): ?string {
    return this.storage.getItem(key)
  }
}

type LocalStoreKey =
  '@@legislated/intro-visited'

type SessionStoreKey =
  '@@legislated/last-search-count'

export const local: Store<LocalStoreKey> = new Store(localStorage)
export const session: Store<SessionStoreKey> = new Store(sessionStorage)
