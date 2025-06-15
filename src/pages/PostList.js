import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import 'bulma/css/bulma.min.css';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="container mt-6">
      <div className="box">
        <div className="level mb-4">
          <div className="level-left">
            <h2 className="title is-4">📚 게시물 목록</h2>
          </div>
          <div className="level-right">
            <Link to="/posts/new" className="button is-primary is-light">
              ✏️ 새 글 작성
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="has-text-grey">작성된 게시물이 없습니다.</p>
        ) : (
          <div className="columns is-multiline">
            {posts.map((p) => (
              <div key={p.id} className="column is-half">
                <Link to={`/posts/${p.id}`}>
                  <div className="box hoverable" style={{ cursor: 'pointer' }}>
                    <h3 className="title is-5">{p.title}</h3>
                    <p className="is-size-7 has-text-grey">
                      작성일: {p.createdAt?.toDate().toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
