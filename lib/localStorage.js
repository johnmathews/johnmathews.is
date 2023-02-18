export const getFromStorage = (key) => {
  if (typeof window !== "undefined") {
    const retrieved = window.localStorage.getItem(key)
    return retrieved
  }
}

export const setToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value)
  }
}
