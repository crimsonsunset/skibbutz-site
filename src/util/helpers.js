const store = require("store")
const { get,set } = require("lodash")

export function getProfile() {
  return store.get("user")
}

export function isBrowser() {
  return (typeof window !== "undefined")
}

export function getWindowVariable(propertyPath) {
  const possWindow = typeof window !== "undefined" && window
  return get(possWindow, propertyPath)
}

export function setWindowVariable(key, value) {
  const possWindow = typeof window !== "undefined" && window
  possWindow && set(possWindow, [key], value)
}
