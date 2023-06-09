import { useState, useEffect } from 'react'

export const isFalsy = value => (value === 0 ? false : !value)

export const clearObject = object => {
  const res = { ...object }
  Object.keys(res).forEach(key => {
    const value = res[key]
    if (isFalsy(value)) delete res[key]
  })
  return res
}

export const useMount = callback => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
