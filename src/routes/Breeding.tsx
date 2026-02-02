import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/Breeding')({
  component: Breeding,
})

function Breeding() {
  const [father, setFather] = useState('normal')
  const [mother, setMother] = useState('lilly')

  const calculateResult = () => {
    if (father === 'lilly' && mother === 'lilly') {
      return { 
        warning: "致死基因预警：莉莉白 x 莉莉白 有 25% 概率产生‘超级白’致死胚胎。",
        results: [
          { label: "莉莉白 (Lilly White)", percent: "50%", color: "#588157" },
          { label: "原始种 (Wild Type)", percent: "25%", color: "#A3B18A" },
          { label: "致死/未孵化 (Lethal)", percent: "#7f1d1d" }
        ]
      };
    }
    if (father === 'lilly' || mother === 'lilly') {
      return { 
        warning: null,
        results: [
          { label: "莉莉白 (Lilly White)", percent: "50%", color: "#588157" },
          { label: "原始种 (Wild Type)", percent: "50%", color: "#A3B18A" }
        ]
      };
    }
    return { 
      warning: null, 
      results: [{ label: "原始种/混合表现", percent: "100%", color: "#A3B18A" }] 
    };
  };

  const currentResult = calculateResult();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-5xl font-bold text-moss-dark">遗传规律模拟器</h1>
        <p className="text-moss-light max-w-xl mx-auto italic">
          科学预测子代表现。当前支持：莉莉白 (Lilly White) 不完全显性遗传模型。
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-green-900/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">父亲 (Sire)</label>
            <select 
              value={father} 
              onChange={(e) => setFather(e.target.value)} 
              className="w-full bg-amber-50 p-5 rounded-global font-bold text-moss-dark focus:ring-2 focus:ring-moss-light outline-none transition-all"
            >
              <option value="normal">原始种 / 非莉莉白</option>
              <option value="lilly">莉莉白 (Lilly White)</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">母亲 (Dam)</label>
            <select 
              value={mother} 
              onChange={(e) => setMother(e.target.value)} 
              className="w-full bg-amber-50 p-5 rounded-global font-bold text-moss-dark focus:ring-2 focus:ring-moss-light outline-none transition-all"
            >
              <option value="normal">原始种 / 非莉莉白</option>
              <option value="lilly">莉莉白 (Lilly White)</option>
            </select>
          </div>
        </div>

        <div className="bg-moss-dark rounded-[2rem] p-8 text-amber-50 space-y-6">
          <h3 className="text-xl font-bold border-b border-white/10 pb-4">子代预期概率</h3>
          {currentResult.warning && (
            <div className="bg-red-900/40 p-4 rounded-global flex items-center gap-3 text-red-100 text-xs border border-red-500/30">
              <AlertTriangle size={18} />
              {currentResult.warning}
            </div>
          )}
          <div className="space-y-6">
            {currentResult.results.map((res, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>{res.label}</span>
                  <span>{res.percent}</span>
                </div>
                <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-700" style={{ width: res.percent, backgroundColor: res.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}