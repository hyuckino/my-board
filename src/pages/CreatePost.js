import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import 'bulma/css/bulma.min.css'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title || !content) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        content,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      })
      navigate(`/posts/${docRef.id}`)
    } catch (err) {
      setError('글 작성 중 오류가 발생했습니다: ' + err.message)
    }
  }

  return (
    <div className="container mt-6">
      <div className="box">
        <h2 className="title is-4">✏️ 새 글 작성</h2>

        {error && (
          <div className="notification is-danger is-light">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 제목 입력 */}
          <div className="field">
            <label className="label">제목</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 내용 입력 */}
          <div className="field">
            <label className="label">내용</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          {/* 버튼 */}
          <div className="field is-grouped is-justify-content-flex-end mt-4">
            <div className="control">
              <button type="submit" className="button is-primary">
                등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
