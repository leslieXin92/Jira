import { useMemo } from 'react'
import { useUrlQueryParams } from 'utils/url'

export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId'])
  return [useMemo(() => ({ ...params, personId: Number(params.personId) || undefined }), [params]), setParams] as const
}
