import { useCallback, useEffect, useReducer, useState } from 'react'
import { useMountedRef } from 'utils'

interface State<T> {
  error: Error | null
  data: T | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispath: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispath(...args) : void 0), [dispath, mountedRef])
}

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
  const [state, dispath] = useReducer((state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  })
  const [retry, setRetry] = useState(() => () => {})
  const safeDispath = useSafeDispatch(dispath)

  const config = { ...defaultConfig, ...initialConfig }

  const setData = useCallback(
    (data: T) =>
      safeDispath({
        data,
        status: 'success',
        error: null
      }),
    [safeDispath]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispath({
        error,
        status: 'error',
        data: null
      }),
    [safeDispath]
  )

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) throw new Error('请传入 Promise 类型数据')

      safeDispath({ status: 'loading' })
      setRetry(() => () => runConfig?.retry && run(runConfig.retry(), runConfig))

      return promise
        .then(data => {
          setData(data)
          return data
        })
        .catch(error => {
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [safeDispath, setData, setError, config.throwOnError]
  )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}
