import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import 'bulma/css/bulma.min.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('로그인 실패: ' + err.message)
    }
  }

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <h2 className="title is-4 has-text-centered mb-5">🔐 로그인</h2>

          {error && (
            <div className="notification is-danger is-light">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <div className="field">
              <label className="label">이메일</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className="field">
              <label className="label">비밀번호</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 버튼 */}
            <div className="field mt-5">
              <div className="control">
                <button type="submit" className="button is-primary is-fullwidth">
                  로그인
                </button>
              </div>
            </div>
          </form>

          {/* 회원가입 링크 */}
          <p className="has-text-centered is-size-7 mt-4">
            계정이 없으신가요?{' '}
            <Link to="/register" className="has-text-link">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
