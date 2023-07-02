import React from 'react'
import { User } from './SearchPanel'
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useDocumentTitle } from 'utils'
import { Link } from 'react-router-dom'
import { Pin } from 'components/Pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectDrawer, useProjectQueryKey } from './utils'

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

  const { mutate } = useEditProject(useProjectQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          dataIndex: 'pin',
          render: (value, project) => <Pin checked={value} onCheckedChange={pinProject(project.id)} />
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
        },
        {
          title: '操作',
          render: (_, project) => <More project={project} />
        }
      ]}
      {...props}
    />
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectDrawer()
  const editProject = (id: number) => () => startEdit(id)

  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id: number) => () => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk: () => deleteProject({ id })
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key='edit'>
            <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key='delete'>
            <ButtonNoPadding type={'link'} onClick={confirmDeleteProject(project.id)}>
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
