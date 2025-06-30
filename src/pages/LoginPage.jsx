// src/pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase-auth'; // Firebase Auth 인스턴스
import '../styles/LoginPage.css';
import eyeOpen from '../assets/eye-open.png';
import eyeClosed from '../assets/eye-closed.png';

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const inputId = e.target[0].value;
    const inputPw = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, inputId, inputPw);
      alert('로그인 성공!');
      navigate('/dashboard');
    } catch (error) {
      console.error('로그인 오류:', error.code, error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('존재하지 않는 계정입니다.');
          break;
        case 'auth/wrong-password':
          setError('비밀번호가 틀렸습니다.');
          break;
        case 'auth/invalid-email':
          setError('이메일 형식이 잘못되었습니다.');
          break;
        default:
          setError('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const eyeStyle = {
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '20px',
    cursor: 'pointer',
    padding: '2px',
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="로고" className="logo" />
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="이메일(아이디)" required />

          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              required
              style={{ width: '100%' }}
            />
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="비밀번호 보기"
              onClick={() => setShowPassword((prev) => !prev)}
              style={eyeStyle}
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <button type="submit">로그인</button>
          <button
            type="button"
            className="signup-button"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
