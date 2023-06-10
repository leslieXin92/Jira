import React from 'react'
import { useAuth } from 'context/authContext'
import { ProjectListScreen } from 'screens/ProjectList'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  )
}
