import { useCallback, useEffect, useState } from 'react'
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

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState
  })
  const [retry, setRetry] = useState(() => () => {})
  const mountedRef = useMountedRef()

  const config = { ...defaultConfig, ...initialConfig }

  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        status: 'success',
        error: null
      }),
    []
  )

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        status: 'error',
        data: null
      }),
    []
  )

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) throw new Error('请传入 Promise 类型数据')

      setState(preState => ({ ...preState, status: 'loading' }))
      setRetry(() => () => runConfig?.retry && run(runConfig.retry(), runConfig))

      return promise
        .then(data => {
          mountedRef.current && setData(data)
          return data
        })
        .catch(error => {
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [mountedRef, setData, setError, config.throwOnError]
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
