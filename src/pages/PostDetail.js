// src/pages/PostDetail.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  // Fetch post data once
  useEffect(() => {
    async function fetchPost() {
      const docRef = doc(db, 'posts', id)
      const snap = await getDoc(docRef)
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() })
    }
    fetchPost()
  }, [id])

  // Real-time comments subscription
  useEffect(() => {
    const q = query(
      collection(db, 'posts', id, 'comments'),
      orderBy('createdAt', 'asc')
    )
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [id])

  // Submit new comment
  const handleComment = async e => {
    e.preventDefault()
    if (!text.trim()) return
    await addDoc(collection(db, 'posts', id, 'comments'), {
      text,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    })
    setText('')
  }

  if (!post) return <p>로딩 중…</p>

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <hr />
      <h3>댓글</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            {c.text}
            <br />
            <small>{c.createdAt?.toDate().toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit">작성</button>
      </form>
    </div>
  )
}
