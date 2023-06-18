import React, { FormEvent } from 'react'
import { useAuth } from 'context/authContext'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticatedApp'
import { on } from 'process'
import { useAsync } from 'utils/useAsync'

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleRegister = (values: { username: string; password: string; confirmPassword: string }) => {
    if (values.confirmPassword !== values.password) return onError(new Error('请确认两次输入的密码相同'))
    run(register(values)).catch(onError)
  }

  return (
    <Form onFinish={handleRegister}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type='text' placeholder='请输入用户名' />
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder='请输入密码' />
      </Form.Item>

      <Form.Item name='confirmPassword' rules={[{ required: true, message: '请确认密码' }]}>
        <Input type='password' placeholder='请确认密码' />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} type='primary' htmlType='submit'>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
