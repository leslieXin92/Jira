import { Button, Drawer } from 'antd'
import React from 'react'

export const ProjectDrawer = (props: { projectDrawerOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer width='100%' visible={props.projectDrawerOpen} onClose={props.onClose}>
      <h1>Project Drawer</h1>
      <Button onClick={props.onClose}>close</Button>
    </Drawer>
  )
}
