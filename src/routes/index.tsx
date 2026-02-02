import { createFileRoute, Link } from '@tanstack/react-router'
import { Coffee, BookOpen, Calculator, Sparkles, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 英雄展台 (Hero Section) */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#A3B18A]/20 text-[#2D4628] px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-[#A3B18A]/30 animate-pulse">
            <Sparkles size={16} /> 发现睫角守宫的基因艺术
          </div>
          
          <h1 className="serif text-6xl md:text-8xl font-bold text-[#2D4628] leading-tight">
            在这里，遇见你的<br />
            <span className="text-[#588157]">灵感守宫</span>
          </h1>
          
          <p className="text-[#588157] text-xl max-w-2xl mx-auto leading-relaxed">
            睫角守宫咖啡馆是一个致力于推广科学爬宠文化、提供专业饲养指导与基因计算的垂直社区。
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-10">
            <Link to="/care-guide" className="bg-[#2D4628] text-[#FDF6E3] px-10 py-5 rounded-global shadow-2xl hover:bg-black transition-all font-bold text-lg flex items-center gap-2">
              开始探索百科 <ChevronRight size={20} />
            </Link>
            <Link to="/Morphs" className="bg-white text-[#2D4628] border-2 border-[#2D4628]/10 px-10 py-5 rounded-global shadow-lg hover:bg-[#FDF6E3] transition-colors font-bold text-lg">
              欣赏品系图鉴
            </Link>
          </div>
        </div>
      </section>

      {/* 核心功能板块 (Features) */}
      <section className="py-24 bg-[#E9E4D4]/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-global shadow-sm border border-[#2D4628]/5 hover:shadow-xl transition-all group">
            <div className="mb-6 p-4 bg-[#FDF6E3] w-fit rounded-2xl group-hover:rotate-12 transition-transform">
              <BookOpen className="text-[#588157]" size={32} />
            </div>
            <h3 className="serif text-2xl font-bold text-[#2D4628] mb-4">科学百科</h3>
            <p className="text-[#588157] leading-relaxed">从零开始的保姆级指南，涵盖温控、造景、喂食与疾病预防。</p>
          </div>

          <div className="bg-white p-10 rounded-global shadow-sm border border-[#2D4628]/5 hover:shadow-xl transition-all group">
            <div className="mb-6 p-4 bg-[#FDF6E3] w-fit rounded-2xl group-hover:rotate-12 transition-transform">
              <Calculator className="text-[#588157]" size={32} />
            </div>
            <h3 className="serif text-2xl font-bold text-[#2D4628] mb-4">遗传模拟</h3>
            <p className="text-[#588157] leading-relaxed">基于莉莉白（Lilly White）等不完全显性遗传模型，一键预测子代概率。</p>
          </div>

          <div className="bg-white p-10 rounded-global shadow-sm border border-[#2D4628]/5 hover:shadow-xl transition-all group">
            <div className="mb-6 p-4 bg-[#FDF6E3] w-fit rounded-2xl group-hover:rotate-12 transition-transform">
              <Coffee className="text-[#588157]" size={32} />
            </div>
            <h3 className="serif text-2xl font-bold text-[#2D4628] mb-4">成长记录</h3>
            <p className="text-[#588157] leading-relaxed">登录社区，开启您的云端饲养簿，精准追踪守宫体重与健康趋势。</p>
          </div>
        </div>
      </section>
    </div>
  )
}