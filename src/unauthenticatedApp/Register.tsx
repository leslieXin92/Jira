import React, { FormEvent } from 'react'
import { useAuth } from 'context/authContext'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticatedApp'

export const RegisterScreen = () => {
  const { register } = useAuth()

  return (
    <Form onFinish={register}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type='text' placeholder='请输入用户名' />
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder='请输入密码' />
      </Form.Item>

      <Form.Item>
        <LongButton type='primary' htmlType='submit'>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
