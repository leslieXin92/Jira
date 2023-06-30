import { useMemo } from 'react'
import { useUrlQueryParams } from 'utils/url'

export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId'])
  return [useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]), setParams] as const
}

export const useProjectDrawer = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams(['projectCreate'])
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: undefined })
  return {
    projectDrawerOpen: projectCreate === 'true',
    open,
    close
  }
}
