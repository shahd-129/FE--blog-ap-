import { Navbarauth } from 'Component'
import React from 'react'
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (<>
  <Navbarauth/>
    <Outlet />

  </>
  )
}
