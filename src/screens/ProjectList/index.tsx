import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './utils'
import { ButtonNoPadding, Row } from 'components/lib'
import { useDispatch } from 'react-redux'
import { setProjectDrawerOpen } from './ProjectList.slice'

export const ProjectListScreen = () => {
  const [params, setParams] = useProjectsSearchParams()
  const { data: users } = useUsers()
  const dispatch = useDispatch()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(params, 200))

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link' onClick={() => dispatch(setProjectDrawerOpen())}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      <List loading={isLoading} users={users || []} dataSource={list || []} refresh={retry} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
