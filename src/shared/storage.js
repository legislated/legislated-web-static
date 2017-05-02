/* globals localStorage */
// @flow
type StorageKey = 'visited-intro'

export function get (key: StorageKey): ?string {
  return localStorage.getItem(key)
}

export function set (key: StorageKey, value: ?string) {
  if (value) {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem(key)
  }
}
