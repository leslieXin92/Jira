import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [params, setParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev, key) => ({ ...prev, [key]: params.get(key) || '' }), {} as { [key in T]: string }),
      [params]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(Object.entries(params).filter(([k]) => keys.includes(k as T))),
        ...params
      }) as URLSearchParamsInit
      return setParams(o)
    }
  ] as const
}
