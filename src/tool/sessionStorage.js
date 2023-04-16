export const storageKey = {
  circuits: 'circuits',
  drivers: 'drivers'
}

export const setStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item '${key}' in sessionStorage:`, error)
  }
}

export const getStorage = (key) => {
  try {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error(`Error getting item '${key}' from sessionStorage:`, error)
    return null
  }
}

export const removeStorage = (key) => {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item '${key}' from sessionStorage:`, error)
  }
}

export const clearStorage = () => {
  try {
    sessionStorage.clear()
  } catch (error) {
    console.error('Error clearing sessionStorage:', error)
  }
}
