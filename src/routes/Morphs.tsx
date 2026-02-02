import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Camera, Search } from 'lucide-react'
import MorphCard from '../components/MorphCard'

// 1. 注册路由
export const Route = createFileRoute('/Morphs')({
  component: MorphsPage,
})

function MorphsPage() {
  const [activeTab, setActiveTab] = useState('所有');
  
  const allMorphs = [
    { name: "莉莉白 (Lilly White)", image: "https://picsum.photos/seed/gecko1/800/600", features: ["全白底色", "奶油背部"] },
    { name: "超级大麦町", image: "https://picsum.photos/seed/gecko8/800/600", features: ["大墨点", "黄色底色"] },
    { name: "双色火团", image: "https://picsum.photos/seed/gecko9/800/600", features: ["红黄撞色", "高对比"] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* 头部区域 */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-5xl font-bold text-moss-dark">品系艺术廊</h1>
          <p className="text-moss-light text-lg">收录全球惊艳的睫角守宫基因组合。</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-moss-light" size={18} />
            <input 
              type="text" 
              placeholder="搜索品系..." 
              className="bg-white border border-green-900/10 pl-12 pr-6 py-4 rounded-global w-full md:w-64 shadow-sm focus:ring-2 focus:ring-moss-light outline-none transition-all" 
            />
          </div>
          <button className="bg-moss-dark text-white p-4 rounded-global shadow-lg hover:rotate-6 transition-transform active:scale-95">
            <Camera size={24} />
          </button>
        </div>
      </div>

      {/* 栅格展示区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allMorphs.map((morph, idx) => (
          <MorphCard key={idx} {...morph} />
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-20 text-center border-t border-green-900/5 pt-10">
        <p className="text-moss-light/60 text-sm italic">
          正在持续更新更多稀有基因表现...
        </p>
      </div>
    </div>
  );
}