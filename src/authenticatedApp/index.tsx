import React from 'react'
import { useAuth } from 'context/authContext'
import { ProjectListScreen } from 'screens/ProjectList'
import styled from '@emotion/styled'
import { Row } from 'components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>

        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const PageHeader = styled.header`
  height: 6rem;
`

const Main = styled.main`
  height: calc(100vh - 6rem);
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``