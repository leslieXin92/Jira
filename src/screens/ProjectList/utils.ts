import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useUrlQueryParams } from 'utils/url'

export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId'])
  return [useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]), setParams] as const
}

export const useProjectDrawer = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams(['editingProjectId'])

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setProjectCreate({ projectCreate: undefined })
    setEditingProjectId({ editingProjectId: undefined })
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  return {
    projectDrawerOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
