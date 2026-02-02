import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface ArticlesProps {
  defaultCategory?: string;
}

const Articles: React.FC<ArticlesProps> = ({ defaultCategory = "全部" }) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const categories = ["全部", "环境", "食物", "疾病", "繁殖"];
  const allArticles = [
    { id: 1, title: "深度解析：睫角守宫原生地环境模拟", category: "环境", date: "2024-05-10", readTime: "8 min", summary: "如何利用软木皮、攀爬藤蔓和活体植物打造一个近乎完美的原生缸。" },
    { id: 2, title: "市面主流果泥品牌测评：哪款最受守宫欢迎？", category: "食物", date: "2024-05-08", readTime: "12 min", summary: "对比 Pangea, Repashy 等一线品牌的营养成分与适口性。" },
    { id: 3, title: "关于MBD（代谢性骨病）的早期预防与识别", category: "疾病", date: "2024-05-05", readTime: "15 min", summary: "钙粉与维生素D3的比例失调是导致睫角守宫骨骼问题的元凶。" },
    { id: 4, title: "繁殖季进补：母守宫的产后修复指南", category: "繁殖", date: "2024-05-01", readTime: "10 min", summary: "产卵期母守宫需要大量的能量补充，如何平衡蛋白质与矿物质？" }
  ];

  const filteredArticles = activeCategory === "全部" 
    ? allArticles 
    : allArticles.filter(a => a.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 animate-in">
      <header className="mb-16 space-y-6">
        <h1 className="serif text-4xl md:text-5xl font-bold text-moss-dark">饲养百科</h1>
        <p className="text-moss-light text-lg max-w-2xl font-light">沉淀最具实战价值的饲养经验，帮助您的睫角守宫健康成长。</p>
      </header>
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-y border-moss-light/10 py-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-global text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeCategory === cat ? 'bg-moss text-cream-DEFAULT shadow-lg' : 'bg-cream-dark/30 text-moss-light hover:bg-moss-light/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {filteredArticles.map((article) => (
          <div key={article.id} className="group grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-moss-light/10 last:border-0">
            <div className="md:col-span-1">
              <div className="aspect-square bg-moss-dark/5 rounded-global overflow-hidden">
                <img src={`https://picsum.photos/seed/article${article.id}/400/400`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-earth font-bold">
                <span>{article.category}</span>
                <span className="text-moss-light/20">|</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              </div>
              <h3 className="serif text-2xl font-bold text-moss-dark group-hover:text-moss-light">{article.title}</h3>
              <p className="text-moss-light/80 font-light">{article.summary}</p>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-moss-dark hover:text-earth transition-colors">
                阅读全文 <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;