import React from 'react'
import { ReactNode } from 'react'
import { AuthProvider } from './authContext'
import { QueryClientProvider, QueryClient } from 'react-query'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
