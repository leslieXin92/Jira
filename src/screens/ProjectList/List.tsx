import React from 'react'
import { User } from './SearchPanel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'

export interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          dataIndex: 'personId',
          render: value => <span>{users.find(user => user.id === value)?.name || '未知'}</span>
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          render: value => dayjs(value).format('YYYY-MM-DD') || '无'
        }
      ]}
      {...props}
    />
  )
}
