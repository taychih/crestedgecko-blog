import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, Thermometer, Utensils, HeartPulse } from 'lucide-react'
// 注意：如果下面这一行报错，说明你还没做第二步
import MorphCard from '../components/MorphCard'

export const Route = createFileRoute('/Home')({
  component: Home,
})

function Home() {
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
    <div className="flex flex-col">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#2D4F1E]">
        <img 
          src="https://images.unsplash.com/photo-1548404764-56a52041060a?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt="Rainforest Background"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl space-y-8">
          <div className="inline-block bg-amber-900/20 backdrop-blur-sm border border-amber-900/30 px-6 py-2 rounded-full mb-4">
            <span className="text-amber-50 text-xs font-bold tracking-[0.4em] uppercase">欢迎来到睫角之魂咖啡馆</span>
          </div>
          <h1 className="text-5xl md:text-8xl text-amber-50 font-bold leading-tight">慢享雨林的<br /><span className="text-amber-600 italic">微型艺术品</span></h1>
          <p className="text-amber-50/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            在这里，我们不仅交流顶尖品系的繁育技巧，更提供一个温馨的社群空间。享受一杯咖啡，探索睫角守宫的奇妙世界。
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/posts" className="bg-amber-50 text-[#2D4F1E] px-10 py-4 rounded-xl font-bold shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">开始学习饲养</Link>
            <Link to="/posts" className="bg-transparent border border-amber-50 text-amber-50 px-10 py-4 rounded-xl font-bold hover:bg-amber-50/10 transition-all">浏览品系图鉴</Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-10">
            <div className="flex items-baseline justify-between border-b border-green-900/30 pb-4">
              <h2 className="text-2xl font-bold text-green-900">最新饲养技巧</h2>
              <Link to="/posts" className="text-xs font-bold text-amber-700 hover:text-green-700 uppercase tracking-widest">全部</Link>
            </div>
            <div className="space-y-6">
              {latestCareTips.map((tip, idx) => (
                <div key={idx} className="group flex gap-4 p-4 rounded-xl border border-transparent hover:border-green-900/10 hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-md">
                  <div className="bg-amber-50 p-3 h-fit rounded-xl">{tip.icon}</div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-widest">{tip.category}</span>
                    <h3 className="text-sm font-medium text-green-900 leading-snug group-hover:text-green-700">{tip.title}</h3>
                    <p className="text-[10px] text-green-900/60">{tip.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-baseline justify-between border-b border-green-900/30 pb-4">
              <h2 className="text-2xl font-bold text-green-900">热门品系推荐</h2>
              <Link to="/posts" className="text-xs font-bold text-amber-700 hover:text-green-700 uppercase tracking-widest">进入图鉴</Link>
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
}