import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Logbook from './pages/Logbook';
import Morphs from './pages/Morphs';
import Breeding from './pages/Breeding';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  const handleLogin = (userData: { name: string; avatar: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/care-guide" element={<Articles defaultCategory="全部" />} />
            <Route 
              path="/logbook" 
              element={isLoggedIn ? <Logbook user={user} /> : <Navigate to="/" replace />} 
            />
            <Route path="/morphs" element={<Morphs />} />
            <Route path="/breeding" element={<Breeding />} />
            <Route path="/about" element={
              <div className="p-20 text-center animate-in">
                <h2 className="serif text-4xl font-bold text-moss-dark mb-4">关于我们</h2>
                <p className="text-moss-light max-w-2xl mx-auto">睫角守宫咖啡馆是一个致力于推广科学爬宠文化、提供专业饲养指导的垂直社区。</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="bg-moss-dark text-cream-DEFAULT py-12 text-center mt-20 border-t border-moss-light/20">
          <p className="serif text-xl mb-2">睫角守宫咖啡馆 © 2024</p>
          <p className="text-xs opacity-50 font-mono tracking-widest uppercase">Professional Crested Gecko Care & Community Cafe</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;