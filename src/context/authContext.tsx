import React, { Dispatch, useCallback } from 'react'
import { createContext, useState, ReactNode, useContext } from 'react'
import { User } from 'screens/ProjectList/SearchPanel'
import * as auth from 'authProvider'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { bootstrap, selectUser } from 'store/auth.slice'

export interface AuthForm {
  username: string
  password: string
}

export const bootstrapUser = async () => {
  const token = auth.getToken()
  if (!token) return null
  const { user } = await http('me', { token })
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIdle, isLoading, isError, error } = useAsync<User | null>(undefined, {
    throwOnError: true
  })

  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>

  useMount(() => {
    run(dispatch(bootstrap()))
  })

  if (isIdle || isLoading) return <FullPageLoading />

  if (isError) return <FullPageErrorFallback error={error} />

  return children as JSX.Element
}

export const useAuth = () => {
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>
  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  const bootstrap = useCallback(() => dispatch(authStore.bootstrap()), [dispatch])
  return { user, login, register, logout, bootstrap }
}
