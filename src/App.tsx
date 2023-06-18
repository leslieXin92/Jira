import React from 'react'
import './App.css'
import { useAuth } from 'context/authContext'
import { AuthenticatedApp } from 'authenticatedApp'
import { UnauthenticatedApp } from 'unauthenticatedApp'
import { FullPageErrorFallback } from 'components/lib'
import { ErrorBoundary } from 'components/ErrorBoundary'

function App() {
  const { user } = useAuth()

  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
