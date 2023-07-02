import { Project } from 'screens/ProjectList/List'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', params], () => client('projects', { params: cleanObject(params || {}) }))
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, { method: 'PATCH', params }), {
    onSuccess() {
      queryClient.invalidateQueries('projects')
    }
  })
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params: Partial<Project>) => client(`projects`, { method: 'POST', params }), {
    onSuccess() {
      queryClient.invalidateQueries('projects')
    }
  })
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id)
  })
}
