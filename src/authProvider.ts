import { User } from 'screens/ProjectList/SearchPanel'

const localStorageKey = '__auth_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey)

// 获取用户信息
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 注册
export const register = async (params: { username: string; password: string }) => {
  const res = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  if (res.ok) return handleUserResponse(await res.json())
}

// 登录
export const login = async (params: { username: string; password: string }) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  if (res.ok) return handleUserResponse(await res.json())
}

// 登出
export const logout = async () => window.localStorage.removeItem(localStorageKey)
