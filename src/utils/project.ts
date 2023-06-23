import { useCallback, useEffect } from 'react'
import { useAsync } from './useAsync'
import { Project } from 'screens/ProjectList/List'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...rest } = useAsync<Project[]>()

  const fetchProjects = useCallback(() => client('projects', { params: cleanObject(params || {}) }), [client, params])

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [params, fetchProjects])

  return rest
}

export const useEditProject = () => {
  const client = useHttp()
  const { run, ...asyncRes } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, { params, method: 'PATCH' }))
  }

  return { mutate, ...asyncRes }
}

export const useAddProject = () => {
  const client = useHttp()
  const { run, ...asyncRes } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, { params, method: 'POST' }))
  }

  return { mutate, ...asyncRes }
}
