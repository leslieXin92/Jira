import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { Project } from 'screens/ProjectList/List'
import { clearObject } from 'utils'
import { useHttp } from './http'

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...rest } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { params: clearObject(params || {}) }))
  }, [params])

  return rest
}
