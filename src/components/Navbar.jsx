// src/components/Navbar.jsx
import { signOut } from 'firebase/auth';
import auth from '../firebase-auth';

function Navbar() {
  const handleLogout = async () => {
    await signOut(auth);
    alert('로그아웃 완료');
  };

  return (
    <nav className="navbar">
      <button onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}

export default Navbar;
