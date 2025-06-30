import '../styles/DashboardPage.css';
import '../styles/RecordingUI.css';
import { useState, useEffect } from 'react';
import RecordingUI from '../components/RecordingUI';

import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import auth from '../firebase-auth';
import app from '../firebase-config';

function DashboardPage() {
  const initialDummyData = [
    { 담당자: '박소하', 이름: '박지희', 성별: '여성', 주민번호: '19820609-192823295', 연락처: '010-7698-3102' },
    { 담당자: '김예은', 이름: '최성우', 성별: '남성', 주민번호: '19900223-195525993', 연락처: '010-3207-3261' },
    { 담당자: '김희진', 이름: '윤지나', 성별: '여성', 주민번호: '20030124-492718377', 연락처: '010-4186-1899' },
    { 담당자: '박소하', 이름: '이지선', 성별: '여성', 주민번호: '19690405-192346279', 연락처: '010-2066-5626' },
    { 담당자: '김희진', 이름: '정하은', 성별: '여성', 주민번호: '19950706-192345595', 연락처: '010-5923-7564' },
    { 담당자: '김예은', 이름: '김장수', 성별: '남성', 주민번호: '19630909-197238240', 연락처: '010-8942-7181' },
    { 담당자: '김예은', 이름: '박민하', 성별: '여성', 주민번호: '19880322-192634987', 연락처: '010-1576-9034' },
    { 담당자: '박소하', 이름: '임태호', 성별: '남성', 주민번호: '19540930-197845039', 연락처: '010-4053-7794' },
    { 담당자: '김희진', 이름: '이진우', 성별: '남성', 주민번호: '19700228-192643500', 연락처: '010-2914-3078' },
    { 담당자: '김예은', 이름: '장하현', 성별: '남성', 주민번호: '20050407-393142876', 연락처: '010-8261-4945' },
  ];

  const [user, setUser] = useState({ 이름: '홍길동', 성별: '남성', 주민: '19830330-1876322', 연락처: '010-9651-7453' });
  const [dataList, setDataList] = useState(initialDummyData);
  const [activeTabs, setActiveTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('List');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const db = getFirestore(app);
        const uid = firebaseUser.uid;
        try {
          const userDoc = await getDoc(doc(db, 'users', uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser(data.name || firebaseUser.email);
          } else {
            setCurrentUser(firebaseUser.email);
          }
        } catch (err) {
          console.error('사용자 정보 로딩 오류:', err);
        }
      }
    });

    const selected = localStorage.getItem('selectedName');
    if (selected) {
      openTab(selected);
      localStorage.removeItem('selectedName');
    }

    return () => unsubscribe();
  }, []);

  const handleChange = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const openTab = (name) => {
    if (!activeTabs.includes(name)) {
      setActiveTabs([...activeTabs, name]);
    }
    setActiveTab(name);
    localStorage.setItem('selectedName', name);
  };

  const closeTab = (name) => {
    setActiveTabs(activeTabs.filter(tab => tab !== name));
    if (activeTab === name) {
      setActiveTab('List');
    }
  };

  const handleSave = () => {
    const newItem = {
      담당자: currentUser || user.이름,
      이름: user.이름,
      성별: user.성별,
      주민번호: user.주민,
      연락처: user.연락처
    };
    setDataList([newItem, ...dataList]);
  };

  return (
    <div className="dashboard-fullscreen">
      <div className="dashboard-left">
        <div className="user-profile-icon">👤</div>
        <div className="user-form">
          <div className="form-item">
            <label>이름</label>
            <input type="text" value={user.이름} onChange={e => handleChange('이름', e.target.value)} />
          </div>
          <div className="form-item">
            <label>성별</label>
            <input type="text" value={user.성별} onChange={e => handleChange('성별', e.target.value)} />
          </div>
          <div className="form-item">
            <label>주민</label>
            <input type="text" value={user.주민} onChange={e => handleChange('주민', e.target.value)} />
          </div>
          <div className="form-item">
            <label>연락처</label>
            <input type="text" value={user.연락처} onChange={e => handleChange('연락처', e.target.value)} />
          </div>
          <button className="save-button" onClick={handleSave}>저장</button>
        </div>
        <img src="/logo.png" alt="로고" className="dashboard-logo" />
      </div>

      <div className="dashboard-right">
        <div className="filter-tabs">
          <button className={`tab ${activeTab === 'List' ? 'active' : ''}`} onClick={() => setActiveTab('List')}>List</button>
          {activeTabs.map(name => (
            <button key={name} className={`tab ${activeTab === name ? 'active' : ''}`} onClick={() => setActiveTab(name)}>
              {name} <span onClick={(e) => { e.stopPropagation(); closeTab(name); }}>✖</span>
            </button>
          ))}
        </div>

        {activeTab === 'List' ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>담당자</th>
                <th>이름</th>
                <th>성별</th>
                <th>주민등록번호</th>
                <th>연락처</th>
                <th>Dentary</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.담당자}</td>
                  <td>{item.이름}</td>
                  <td>{item.성별}</td>
                  <td>{item.주민번호}</td>
                  <td>{item.연락처}</td>
                  <td>
                    <button className="view-button" onClick={() => openTab(item.이름)}>▶</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="detail-view">
            {(() => {
              const selectedUser = dataList.find(item => item.이름 === activeTab);
              return (
                <>
                  {selectedUser && (
                    <table className="dashboard-table mini-table">
                      <thead>
                        <tr>
                          <th>담당자</th>
                          <th>이름</th>
                          <th>성별</th>
                          <th>주민등록번호</th>
                          <th>연락처</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedUser.담당자}</td>
                          <td>{selectedUser.이름}</td>
                          <td>{selectedUser.성별}</td>
                          <td>{selectedUser.주민번호}</td>
                          <td>{selectedUser.연락처}</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  <RecordingUI />
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
