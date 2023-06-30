import React from 'react'
import { Button, Drawer } from 'antd'
import { useProjectDrawer } from './utils'

export const ProjectDrawer = () => {
  const { projectDrawerOpen, open, close } = useProjectDrawer()
  return (
    <Drawer width='100%' visible={projectDrawerOpen} onClose={close}>
      <h1>Project Drawer</h1>
      <Button onClick={close}>close</Button>
    </Drawer>
  )
}
