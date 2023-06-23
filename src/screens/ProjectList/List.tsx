import React from 'react'
import { User } from './SearchPanel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useDocumentTitle } from 'utils'
import { Link } from 'react-router-dom'
import { Pin } from 'components/Pin'
import { useEditProject } from 'utils/project'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

export const List = ({ users, ...props }: ListProps) => {
  useDocumentTitle('项目列表', false)

  const { mutate } = useEditProject()

  const changePin = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          dataIndex: 'pin',
          render: (value, project) => <Pin checked={value} onCheckedChange={changePin(project.id)} />
        },
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => <Link to={String(project.id)}>{value}</Link>
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
