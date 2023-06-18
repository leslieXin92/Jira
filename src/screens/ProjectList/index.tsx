import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useState } from 'react'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

export const ProjectListScreen = () => {
  const [params, setParams] = useState({ name: '', personId: '' })

  const debounceParams = useDebounce(params, 200)
  const { data: users } = useUsers()
  const { isLoading, error, data: list } = useProjects(debounceParams)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
