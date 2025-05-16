import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-100px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
