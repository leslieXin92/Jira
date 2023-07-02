import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectDrawer, useProjectsSearchParams } from './utils'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  const [params, setParams] = useProjectsSearchParams()
  const { data: users } = useUsers()
  const { isLoading, error, data: list } = useProjects(useDebounce(params, 200))
  const { open } = useProjectDrawer()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link' onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
