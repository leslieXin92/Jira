import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProjectDrawerOpen, setProjectDrawerClose, setProjectDrawerOpen } from './ProjectList.slice'

export const ProjectDrawer = () => {
  const dispatch = useDispatch()
  const projectDrawerOpen = useSelector(selectProjectDrawerOpen)

  return (
    <Drawer width='100%' visible={projectDrawerOpen} onClose={() => dispatch(setProjectDrawerClose())}>
      <h1>Project Drawer</h1>
      <Button onClick={() => dispatch(setProjectDrawerClose())}>close</Button>
    </Drawer>
  )
}
