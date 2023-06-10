import { useState, useEffect } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const clearObject = (object: object) => {
  const res = { ...object }
  Object.keys(res).forEach(key => {
    // @ts-ignore
    const value = res[key]
    // @ts-ignore
    if (isFalsy(value)) delete res[key]
  })
  return res
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
