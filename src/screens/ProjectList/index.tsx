import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useEffect, useState } from 'react'
import qs from 'qs'
import { clearObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [params, setParams] = useState({ name: '', personId: '' })
  const debounceParams = useDebounce(params, 200)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const client = useHttp()

  useMount(() => {
    client('users').then(setUsers)
  })

  useEffect(() => {
    client('projects', { params: clearObject(debounceParams) }).then(setList)
  }, [debounceParams])

  return (
    <>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </>
  )
}
