import React from 'react'
import { ReactNode } from 'react'
import { AuthProvider } from './authContext'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '../store'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
