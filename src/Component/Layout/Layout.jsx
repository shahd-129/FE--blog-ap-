
import Navbar from '../../Component/Navbar/Navbar.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import React from 'react'

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (<>

    <Navbar />
    <Outlet />
    <Sidebar />

  </>
  )
}
