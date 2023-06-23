import { useState, useEffect, useRef } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: Record<string, unknown>) => {
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) document.title = oldTitle
    }
  }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin