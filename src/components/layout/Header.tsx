import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router'; // 1. 关键：从 tanstack 导入
import { Coffee, Github, LogIn, LogOut, X } from 'lucide-react';

const GeckoLogo = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2C10 2 8 3.5 8 6C8 7.5 9 8.5 10 9C8 10 7 12 7 14C7 17 9 19 12 19C15 19 17 17 17 14C17 12 16 10 14 9C15 8.5 16 7.5 16 6C16 3.5 14 2 12 2Z" />
    <path d="M10 19C8 19 6 20 5 22" />
    <path d="M14 19C16 19 18 20 19 22" />
    <circle cx="10.5" cy="5.5" r="1" fill="currentColor" />
    <circle cx="13.5" cy="5.5" r="1" fill="currentColor" />
  </svg>
);

interface HeaderProps {
  isLoggedIn: boolean;
  user: { name: string; avatar: string } | null;
  onLogin: (userData: { name: string; avatar: string }) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onLogin, onLogout }) => {
  // 2. 关键：在 TanStack 中使用 useRouterState 获取当前路径
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '饲养指南', path: '/care-guide' },
    { name: '饲养记录', path: '/Logbook' }, // 注意：根据你之前的路由，这里可能是大写
    { name: '品系图鉴', path: '/Morphs' },  // 注意：根据你之前的路由，这里可能是大写
    { name: '繁育计算', path: '/Breeding' },
  ];

  const handleGithubLogin = () => {
    onLogin({ 
      name: "睫角发烧友", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gecko" 
    });
    setIsLoginModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2D4628]/95 backdrop-blur-md border-b border-[#588157] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="relative bg-[#A3B18A] p-2 rounded-global group-hover:rotate-12 transition-transform flex-shrink-0">
              <GeckoLogo className="text-[#2D4628]" size={26} />
              <div className="absolute -top-1.5 -right-1.5 bg-[#FFB703] rounded-full p-1 shadow-sm border-2 border-[#2D4628]">
                <Coffee size={10} className="text-[#2D4628]" />
              </div>
            </div>
            <span className="serif text-2xl font-bold text-[#FFFDD0] tracking-tight whitespace-nowrap pt-1">
              睫角守宫<span className="text-[#A3B18A]">咖啡馆</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.path === '/Logbook' && !isLoggedIn) return null;
              
              return (
                <Link
                  key={item.path}
                  to={item.path as any} // TanStack 会对路径进行类型检查，这里由于动态映射先跳过类型检查
                  className={`text-[11px] font-bold tracking-widest uppercase transition-colors hover:text-[#FFFDD0] ${
                    currentPath === item.path 
                      ? 'text-[#FFFDD0] border-b-2 border-[#A3B18A] pb-1' 
                      : 'text-[#A3B18A]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#A3B18A] hover:bg-[#588157] text-[#2D4628] px-5 py-2 rounded-global text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <LogIn size={14} />
                加入社区
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[#3A5A40]/40 p-1.5 pr-4 rounded-full border border-[#588157]/30">
                <img src={user?.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-[#A3B18A]" />
                <span className="text-xs font-bold text-[#FFFDD0] uppercase tracking-wider">{user?.name}</span>
                <button 
                  onClick={onLogout} 
                  className="text-[#A3B18A] hover:text-[#FFB703] transition-colors"
                  title="退出登录"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D4628]/80 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)}></div>
          <div className="relative bg-[#FDF6E3] w-full max-w-md rounded-global shadow-2xl overflow-hidden border border-[#588157]">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-[#2D4628]/40"><X size={20} /></button>
            <div className="p-8 space-y-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-[#A3B18A] p-4 rounded-global"><Coffee size={32} className="text-[#2D4628]" /></div>
                <h2 className="serif text-3xl font-bold text-[#2D4628]">会员登记处</h2>
                <p className="text-[#588157] text-sm">登录以开启您的个人饲养记录簿。</p>
              </div>
              <button onClick={handleGithubLogin} className="w-full flex items-center justify-center gap-3 bg-[#2D4628] text-[#FDF6E3] py-4 rounded-global font-bold hover:bg-black transition-all">
                <Github size={20} /> 使用 GitHub 快速登录
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;