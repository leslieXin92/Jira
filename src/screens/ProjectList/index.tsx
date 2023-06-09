import React from 'react'
import { SearchPanel } from './SearchPanel'
import { List } from './List'
import { useEffect, useState } from 'react'
import qs from 'qs'
import { clearObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: '',
    personId: ''
  })
  const debounceParams = useDebounce(params, 200)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) setUsers(await res.json())
    })
  })

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debounceParams))}`).then(async res => {
      if (res.ok) setList(await res.json())
    })
  }, [debounceParams])

  return (
    <>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </>
  )
}
