import React from 'react'
import { Button, Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'
import { useProjectDrawer } from '../screens/ProjectList/utils'

export const ProjectPopover = () => {
  const { open } = useProjectDrawer()

  const { data: projects, isLoading } = useProjects()

  const pinnedProjects = projects?.filter(project => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type='secondary'>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type='link' onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover placement='bottom' content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
