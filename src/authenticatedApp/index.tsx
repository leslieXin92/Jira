import React from 'react'
import { useAuth } from 'context/authContext'
import { ProjectListScreen } from 'screens/ProjectList'
import { ProjectScreen } from 'screens/Project'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu, Button } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />

      <Main>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/projects' />} />
            <Route path='/projects' element={<ProjectListScreen />} />
            <Route path='/projects/:projectId/*' element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width='18rem' color='rgb(38, 132, 255)' />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>

      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key='logout'>
                <Button type='link' onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type='link'>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Main = styled.main`
  height: calc(100vh - 6rem);
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
