import { Project } from 'screens/ProjectList/List'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectsSearchParams } from 'screens/ProjectList/utils'
import { useAddConfig, useEditConfig } from './useOptimisticOptions'

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', params], () => client('projects', { params: cleanObject(params || {}) }))
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, { method: 'POST', params }),
    useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: 'DELETE' }),
    useEditConfig(queryKey)
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, { method: 'PATCH', params }),
    useEditConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id)
  })
}
