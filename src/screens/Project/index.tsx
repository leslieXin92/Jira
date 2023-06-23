import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DashboardScreen } from 'screens/Dashboard'
import { EpicScreen } from 'screens/Epic'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to='dashboard'>看板</Link>
      <Link to='epic'>任务组</Link>
      <Routes>
        <Route path='/' element={<Navigate to='dashboard' />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/epic' element={<EpicScreen />} />
      </Routes>
    </div>
  )
}
