import qs from 'qs'
import { logout } from 'authProvider'
import { useAuth } from 'context/authContext'
import { useCallback } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  params?: object
  token?: string
}

export const http = async (endpoint: string, { params, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': params ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') endpoint += `?${qs.stringify(params)}`
  else config.body = JSON.stringify(params || {})

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登陆' })
    }

    const data = await response.json()
    if (response.ok) return data
    else return Promise.reject(data)
  })
}

export const useHttp = () => {
  const { user } = useAuth()

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
