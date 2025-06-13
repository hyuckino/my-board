// src/components/Layout.js
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div>
      <header className="header-nav">
        <Link to="/">
          <button>Home</button>
        </Link>
        {user ? (
          <button onClick={() => logout()}>로그아웃</button>
        ) : (
          <>
            <Link to="/login"><button>로그인</button></Link>
          </>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
