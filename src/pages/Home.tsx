import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Thermometer, Utensils, HeartPulse } from 'lucide-react';
import MorphCard from '../components/MorphCard';

const Home: React.FC = () => {
  const hotMorphs = [
    {
      name: "莉莉白 (Lilly White)",
      image: "https://picsum.photos/seed/gecko1/800/600",
      features: ["全白底色", "奶油背部", "高对比"]
    },
    {
      name: "红丑 (Red Harlequin)",
      image: "https://picsum.photos/seed/gecko2/800/600",
      features: ["深红底色", "火团纹路", "侧壁洁白"]
    }
  ];

  const latestCareTips = [
    { title: "夏季高温预警：如何防止睫角守宫中暑？", date: "2024-06-20", category: "环境", icon: <Thermometer className="text-red-500" size={18} /> },
    { title: "新手必看：三种适合睫角的最佳造景植物", date: "2024-06-18", category: "环境", icon: <ChevronRight size={18} /> },
    { title: "不爱吃果泥？教你如何纠正睫角守宫的挑食行为", date: "2024-06-15", category: "食物", icon: <Utensils className="text-orange-500" size={18} /> },
    { title: "换季防病：警惕睫角守宫的呼吸道感染", date: "2024-06-12", category: "疾病", icon: <HeartPulse className="text-blue-500" size={18} /> },
  ];

  return (
    <div className="flex flex-col animate-in">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-moss-dark">
        <img 
          src="https://images.unsplash.com/photo-1548404764-56a52041060a?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt="Rainforest Background"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl space-y-8">
          <div className="inline-block bg-earth/20 backdrop-blur-sm border border-earth/30 px-6 py-2 rounded-full mb-4">
            <span className="text-cream-bright text-xs font-bold tracking-[0.4em] uppercase">欢迎来到睫角之魂咖啡馆</span>
          </div>
          <h1 className="serif text-5xl md:text-8xl text-cream-bright font-bold leading-tight">慢享雨林的<br /><span className="text-earth italic">微型艺术品</span></h1>
          <p className="text-cream-DEFAULT/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            在这里，我们不仅交流顶尖品系的繁育技巧，更提供一个温馨的社群空间。享受一杯咖啡，探索睫角守宫的奇妙世界。
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/care-guide" className="bg-cream-bright text-moss-dark px-10 py-4 rounded-global font-bold shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">开始学习饲养</Link>
            <Link to="/morphs" className="bg-transparent border border-cream-DEFAULT text-cream-DEFAULT px-10 py-4 rounded-global font-bold hover:bg-cream-DEFAULT/10 transition-all">浏览品系图鉴</Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-10">
            <div className="flex items-baseline justify-between border-b border-moss-light/30 pb-4">
              <h2 className="serif text-2xl font-bold text-moss-dark">最新饲养技巧</h2>
              <Link to="/care-guide" className="text-xs font-bold text-earth hover:text-moss-light uppercase tracking-widest">全部</Link>
            </div>
            <div className="space-y-6">
              {latestCareTips.map((tip, idx) => (
                <div key={idx} className="group flex gap-4 p-4 rounded-global border border-transparent hover:border-moss-light/10 hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-md">
                  <div className="bg-cream-dark/50 p-3 h-fit rounded-global">{tip.icon}</div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-earth font-bold uppercase tracking-widest">{tip.category}</span>
                    <h3 className="text-sm font-medium text-moss-dark leading-snug group-hover:text-moss-light">{tip.title}</h3>
                    <p className="text-[10px] text-moss-light/60">{tip.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-baseline justify-between border-b border-moss-light/30 pb-4">
              <h2 className="serif text-2xl font-bold text-moss-dark">热门品系推荐</h2>
              <Link to="/morphs" className="text-xs font-bold text-earth hover:text-moss-light uppercase tracking-widest">进入图鉴</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hotMorphs.map((morph, idx) => (
                <MorphCard key={idx} {...morph} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;