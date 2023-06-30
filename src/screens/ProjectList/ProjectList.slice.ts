import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface State {
  projectDrawerOpen: boolean
}

const initialState: State = {
  projectDrawerOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    setProjectDrawerOpen: state => {
      state.projectDrawerOpen = true
    },
    setProjectDrawerClose: state => {
      state.projectDrawerOpen = false
    }
  }
})

export const { setProjectDrawerOpen, setProjectDrawerClose } = projectListSlice.actions

export const selectProjectDrawerOpen = (state: RootState) => state.projectList.projectDrawerOpen
