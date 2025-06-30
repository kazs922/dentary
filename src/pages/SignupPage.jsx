// src/pages/SignupPage.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import auth from '../firebase-auth';
import app from '../firebase-config';
import '../styles/LoginPage.css';
import eyeOpen from '../assets/eye-open.png';
import eyeClosed from '../assets/eye-closed.png';

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('환자');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const db = getFirestore(app);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (pw !== confirmPw) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        email,
        name,
        role,
        createdAt: new Date(),
      });

      alert(`${name}님, 회원가입이 완료되었습니다.`);
      navigate('/');
    } catch (error) {
      console.error('회원가입 오류:', error.code, error.message);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/invalid-email':
          setError('이메일 형식이 올바르지 않습니다.');
          break;
        case 'auth/weak-password':
          setError('비밀번호는 최소 6자 이상이어야 합니다.');
          break;
        default:
          setError('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const eyeStyle = {
    width: '40px',
    height: '20px',
    cursor: 'pointer',
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '2px',
  };

  return (
    <div className="login-container">
      <div className="signup-box">
        <h2 className="signup-title">회원가입</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="이메일(아이디)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
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

          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              style={{ width: '100%' }}
            />
            <img
              src={showConfirm ? eyeOpen : eyeClosed}
              alt="비밀번호 확인 보기"
              onClick={() => setShowConfirm((prev) => !prev)}
              style={eyeStyle}
            />
          </div>

          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* 직급 선택 */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginBottom: '10px' }}
          >
            <option value="환자">환자</option>
            <option value="관리자">관리자</option>
          </select>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <button type="submit">가입하기</button>
          <button
            type="button"
            className="signup-button"
            onClick={() => navigate('/')}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
