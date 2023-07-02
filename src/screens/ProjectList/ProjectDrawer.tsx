import React, { useEffect } from 'react'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectDrawer } from './utils'
import { UserSelect } from 'components/UserSelect'
import { useAddProject, useEditProject } from 'utils/project'
import { ErrorBox } from 'components/lib'
import styled from '@emotion/styled'

export const ProjectDrawer = () => {
  const { projectDrawerOpen, close, editingProject, isLoading } = useProjectDrawer()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject()

  const title = editingProject ? '编辑项目' : '创建项目'
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer width='100%' visible={projectDrawerOpen} onClose={close} forceRender>
      <Container>
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form layout='vertical' style={{ width: '40rem' }} form={form} onFinish={onFinish}>
              <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入项目名称' }]}>
                <Input placeholder='请输入项目名称' />
              </Form.Item>

              <Form.Item label='部门' name='organization' rules={[{ required: true, message: '请输入部门名称' }]}>
                <Input placeholder='请输入部门名称' />
              </Form.Item>

              <Form.Item label='负责人' name='personId'>
                <UserSelect defaultOptionName='负责人' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' loading={mutateLoading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`
