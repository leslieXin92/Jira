import React, { FormEvent } from 'react'
import { useAuth } from 'context/authContext'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticatedApp'
import { useAsync } from 'utils/useAsync'

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleLogin = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError)
  }

  return (
    <Form onFinish={handleLogin}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type='text' placeholder='请输入用户名' />
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder='请输入密码' />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} type='primary' htmlType='submit'>
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  )
}
