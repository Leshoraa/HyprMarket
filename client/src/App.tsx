import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import MobileBottomBar from './components/layout/MobileBottomBar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-1)', position: 'relative' }}>
        {/* Sidebar: auto-hide on mobile via CSS */}
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}>
          <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 40px', height: '100%', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scanner" element={<Scanner />} />
            </Routes>
          </div>
        </main>
        <MobileBottomBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
