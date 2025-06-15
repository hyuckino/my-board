import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import 'bulma/css/bulma.min.css'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  // 게시글 정보 불러오기
  useEffect(() => {
    async function fetchPost() {
      const docRef = doc(db, 'posts', id)
      const snap = await getDoc(docRef)
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() })
    }
    fetchPost()
  }, [id])

  // 댓글 실시간 구독
  useEffect(() => {
    const q = query(collection(db, 'posts', id, 'comments'), orderBy('createdAt', 'asc'))
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [id])

  // 댓글 작성 처리
  const handleComment = async e => {
    e.preventDefault()
    if (!text.trim()) return
    await addDoc(collection(db, 'posts', id, 'comments'), {
      text,
      authorId: user?.uid || '익명',
      createdAt: serverTimestamp(),
    })
    setText('')
  }

  if (!post) return <p className="has-text-centered mt-6">로딩 중…</p>

  return (
    <div className="container mt-6">
      {/* 게시글 내용 */}
      <div className="box">
        <h2 className="title is-4">{post.title}</h2>
        <p className="content">{post.content}</p>
      </div>

      {/* 댓글 목록 */}
      <div className="box">
        <h3 className="title is-5">💬 댓글</h3>
        {comments.length === 0 ? (
          <p className="has-text-grey">아직 댓글이 없습니다.</p>
        ) : (
          <div className="content">
            <ul>
              {comments.map(c => (
                <li key={c.id} className="box mb-3">
                  <p>{c.text}</p>
                  <p className="is-size-7 has-text-grey">
                    {c.createdAt?.toDate().toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 댓글 작성 폼 */}
        {user && (
          <form onSubmit={handleComment} className="mt-4">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-primary">
                  작성
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
