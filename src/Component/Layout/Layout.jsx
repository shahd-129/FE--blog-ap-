import { Navbar} from 'Component'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (<>

    <Navbar />
    <Outlet />

  </>
  )
}