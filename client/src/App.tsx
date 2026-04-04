import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-[#F7F7F9] min-h-screen text-neutral-900 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-8 md:pl-4">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scanner" element={<Scanner />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
