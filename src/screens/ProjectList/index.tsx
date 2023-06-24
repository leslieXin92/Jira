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

export const ProjectListScreen = (props: { setProjectDrawerOpen: (isOpen: boolean) => void }) => {
  const [params, setParams] = useProjectsSearchParams()
  const { data: users } = useUsers()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(params, 200))

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectDrawerOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        refresh={retry}
        setProjectDrawerOpen={props.setProjectDrawerOpen}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
