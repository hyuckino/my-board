// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZqPF3IeJXBGgWYpEF6_C_Z7qovx3ljx4",
  authDomain: "hyuckino.firebaseapp.com",
  projectId: "hyuckino",
  // …나머지 설정
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 인증, 데이터베이스 인스턴스 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);
