import React from 'react'
import { Form, Input } from 'antd'
import { Project } from './List'
import { UserSelect } from 'components/UserSelect'

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[]
  params: Partial<Pick<Project, 'name' | 'personId'>>
  setParams: (params: SearchPanelProps['params']) => void
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  console.log('SearchPanel', params.personId)

  return (
    <Form layout='inline' style={{ marginBottom: '2rem ' }}>
      <Form.Item name='项目名'>
        <Input
          type='text'
          placeholder='请输入项目名'
          value={params.name}
          onChange={e => setParams({ ...params, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item name='负责人'>
        <UserSelect
          value={params.personId}
          defaultOptionName='负责人'
          onChange={value => {
            setParams({ ...params, personId: value })
          }}
        />
      </Form.Item>
    </Form>
  )
}
