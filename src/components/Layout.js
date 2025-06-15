import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import 'bulma/css/bulma.min.css'

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-text-weight-bold has-text-white">
            🐾 정글 게시판
          </Link>
        </div>

        <div className="navbar-menu is-active">
          <div className="navbar-start">
            {/* ✅ 여기 추가: 작고 옅은 슬로건 */}
            <div className="navbar-item">
              <p className="has-text-grey-light is-size-7">
                정글의 야생에서 살아남기 위한 커뮤니티
              </p>
            </div>
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="navbar-item">
                <button className="button is-light" onClick={logout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="navbar-item">
                <Link to="/login" className="button is-primary">
                  로그인
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 본문 영역 */}
      <main className="section pt-0 mt-0">
        <Outlet />
      </main>
    </div>
  )
}