import React, { FormEvent } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
  const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(async res => {
      if (res.ok) console.log(await res.json())
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>用户名</label>
        <input type='text' id='username' />
      </div>
      <div>
        <label htmlFor='password'>密码</label>
        <input type='password' id='password' />
      </div>
      <button type='submit'>注册</button>
    </form>
  )
}
