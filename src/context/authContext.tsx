import React from 'react'
import { createContext, useState, ReactNode, useContext } from 'react'
import { User } from 'screens/ProjectList/SearchPanel'
import * as auth from 'authProvider'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
  username: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

const bootstrapUser = async () => {
  const token = auth.getToken()
  if (!token) return null
  const { user } = await http('me', { token })
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    setData: setUser,
    isIdle,
    isLoading,
    isError,
    error
  } = useAsync<User | null>(undefined, { throwOnError: true })

  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser()).then(setUser)
  })

  if (isIdle || isLoading) return <FullPageLoading />

  if (isError) return <FullPageErrorFallback error={error} />

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}
