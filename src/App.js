// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>            
            <Route index element={<MainPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              path="posts"
              element={
                <PrivateRoute>
                  <PostList />
                </PrivateRoute>
              }
            />
            <Route
              path="posts/new"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="posts/:id"
              element={
                <PrivateRoute>
                  <PostDetail />
                </PrivateRoute>
              }
            />

            {/* 잘못된 경로 리디렉트 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


