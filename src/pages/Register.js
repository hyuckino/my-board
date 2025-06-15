import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import 'bulma/css/bulma.min.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(email, password)
      navigate('/')
    } catch (err) {
      setError('회원가입 실패: ' + err.message)
    }
  }

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <h2 className="title is-4 has-text-centered mb-5">📝 회원가입</h2>

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
                  가입하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
