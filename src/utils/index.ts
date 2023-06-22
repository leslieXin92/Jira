import { useState, useEffect } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const clearObject = (object: Record<string, unknown>) => {
  const res = { ...object }
  Object.keys(res).forEach(key => {
    const value = res[key]
    if (isVoid(value)) delete res[key]
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = false) => {
  const oldTitle = document.title

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) document.title = oldTitle
    }
  }, [])

  useEffect(() => {
    document.title = title
  }, [title])
}