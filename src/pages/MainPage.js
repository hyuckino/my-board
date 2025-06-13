// src/pages/MainPage.js
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // 로그인 상태면 바로 /posts 로 리디렉트
  useEffect(() => {
    if (user) {
      navigate('/posts')
    }
  }, [user, navigate])

  return (
    <div className="main-page">
      <h1>Welcome to My Board!</h1>
      <p>회원가입 후 다양한 게시물을 작성하고, 댓글을 남겨보세요.</p>
    </div>
  )
}
