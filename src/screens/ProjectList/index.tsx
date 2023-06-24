import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './utils'
import { Row } from 'components/lib'

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  const [params, setParams] = useProjectsSearchParams()
  const { data: users } = useUsers()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(params, 200))

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        refresh={retry}
        projectButton={props.projectButton}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
