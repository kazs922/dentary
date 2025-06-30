// src/hooks/useAuthListener.jsx
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase-auth';

function useAuthListener() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
}

export default useAuthListener;
