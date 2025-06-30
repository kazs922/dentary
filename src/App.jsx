// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DashboardChartPage from './pages/DashboardChartPage'; // ✅ 이름 통일

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard-chart" element={<DashboardChartPage />} /> {/* ✅ 이름 정정 */}
      </Routes>
    </Router>
  );
}

export default App;
