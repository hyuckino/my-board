import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import 'bulma/css/bulma.min.css'
import noticeImage from '../assets/gomu-oli-baeyeol-jeongmul.jpg' // 실제 이미지 경로로 바꿔주세요
import { Link } from 'react-router-dom'


export default function MainPage() {
  const { user, login, logout } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError('로그인 실패: ' + err.message)
    }
  }

  return (
    <div className="container m-0 p-0">
      <div className="columns is-centered">
        {/* 왼쪽: 이미지 공지사항 */}
        <div className="column is-half">
          <div className="box">
            <figure className="image is-4by3 mb-4">
              <img src={noticeImage} alt="공지 이미지" />
            </figure>
            <div className="content">
              <h2 className="title is-5">📢 정글 게시판 이용수칙</h2>
              <ul>
                <li>🦍 서로를 존중하며 예의 바른 언어를 사용해주세요.</li>
                <li>🕵️‍♀️ 허위정보, 욕설, 광고 게시글은 삭제됩니다.</li>
                <li>📝 게시글 및 댓글 작성 시 책임감을 갖고 작성해주세요.</li>
                <li>🔒 개인정보는 절대 공유하지 마세요.</li>
              </ul>
              <p className="is-size-7 has-text-grey">📌 위반 시 관리자에 의해 제재될 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그인 박스 */}
        <div className="column is-one-third">
          <div className="box">
            {user ? (
              <>
                <h2 className="title is-5">환영합니다!</h2>
                <p className="mb-4">{user.email}님</p>

                <div className="buttons is-centered">
                  <button className="button is-danger" onClick={logout}>
                    로그아웃
                  </button>
                  <Link to="/mypage" className="button is-link is-light">
                    마이페이지
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="title is-5">로그인</h2>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
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

                  {error && <p className="has-text-danger">{error}</p>}

                  <button className="button is-primary is-fullwidth mt-3" type="submit">
                    로그인
                  </button>
                </form>

                <p className="has-text-centered mt-2 is-size-7">
                  아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
                </p>
              </>
            )}
          </div>
          {/* ✅ 게시판으로 가기 버튼 (항상 표시 가능) */}
          <div className="has-text-centered mt-5">
            <Link to="/posts" className="button is-link is-light is-fullwidth">
              🧭 게시판으로 가기
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
