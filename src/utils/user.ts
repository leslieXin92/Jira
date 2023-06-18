import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { User } from 'screens/ProjectList/SearchPanel'
import { clearObject } from 'utils'
import { useHttp } from './http'

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp()
  const { run, ...rest } = useAsync<User[]>()

  useEffect(() => {
    run(client('users', { params: clearObject(params || {}) }))
  }, [params])

  return rest
}
