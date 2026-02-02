import { createFileRoute } from '@tanstack/react-router'
import { Book, Thermometer, Wind, Utensils } from 'lucide-react'

export const Route = createFileRoute('/Care-guide')({
  component: CareGuide,
})

function CareGuide() {
  const guides = [
    { title: "环境造景", icon: <Wind />, color: "bg-blue-50", desc: "如何利用沉木与植物打造雨林微环境。" },
    { title: "温度湿度", icon: <Thermometer />, color: "bg-orange-50", desc: "22-26°C 是它们的黄金舒适区。" },
    { title: "科学喂养", icon: <Utensils />, color: "bg-green-50", desc: "果泥与活体饲料的最佳配比方案。" },
    { title: "疾病预防", icon: <Book />, color: "bg-purple-50", desc: "识别 MBD 与脱水等常见健康问题。" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in">
      <div className="mb-16 text-center md:text-left">
        <h1 className="serif text-5xl font-bold text-moss-dark mb-4">饲养百科全书</h1>
        <p className="text-moss-light">科学、专业、易懂的睫角守宫基础知识库。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, i) => (
          <div key={i} className="group flex gap-8 p-8 bg-white rounded-global border border-green-900/5 hover:border-earth transition-colors cursor-pointer shadow-sm">
            <div className={`w-16 h-16 rounded-2xl ${guide.color} flex items-center justify-center text-moss-dark group-hover:scale-110 transition-transform`}>
              {guide.icon}
            </div>
            <div className="flex-1">
              <h3 className="serif text-2xl font-bold text-moss-dark mb-2">{guide.title}</h3>
              <p className="text-moss-light leading-relaxed">{guide.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-12 bg-moss-dark rounded-[2.5rem] text-cream-bright flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h2 className="serif text-3xl font-bold">新手第一只守宫建议</h2>
          <p className="opacity-80">我们建议新手从亚成体开始养起，因为它们的肠胃更强健，更能适应新环境的波动...</p>
        </div>
        <button className="bg-earth text-moss-dark px-8 py-4 rounded-global font-bold whitespace-nowrap">阅读进阶指南</button>
      </div>
    </div>
  )
}