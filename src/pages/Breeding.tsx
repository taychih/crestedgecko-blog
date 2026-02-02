
import React, { useState } from 'react';
import { Microscope, Dna, Info, AlertTriangle } from 'lucide-react';

const Breeding: React.FC = () => {
  const [father, setFather] = useState('normal');
  const [mother, setMother] = useState('lilly');

  const calculateResult = () => {
    if (father === 'lilly' && mother === 'lilly') {
      return { 
        warning: "致死基因预警：莉莉白 x 莉莉白 有 25% 概率产生‘超级白’致死胚胎。",
        results: [{ label: "莉莉白", percent: "50%" }, { label: "原始种", percent: "25%" }, { label: "致死/未孵化", percent: "25%" }]
      };
    }
    if (father === 'lilly' || mother === 'lilly') {
      return { 
        warning: null,
        results: [{ label: "莉莉白", percent: "50%" }, { label: "原始种", percent: "50%" }]
      };
    }
    return { warning: null, results: [{ label: "原始种/混合表现", percent: "100%" }] };
  };

  const currentResult = calculateResult();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in">
      <div className="text-center mb-16 space-y-6">
        <h1 className="serif text-5xl font-bold text-moss-dark">遗传规律模拟器</h1>
        <p className="text-moss-light max-w-xl mx-auto">科学预测子代表现。当前支持：莉莉白 (Lilly White) 不完全显性遗传。</p>
      </div>
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-moss-light/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss-light">父亲 (Sire)</label>
            <select value={father} onChange={(e) => setFather(e.target.value)} className="w-full bg-cream-DEFAULT p-5 rounded-global font-bold text-moss-dark focus:outline-none">
              <option value="normal">原始种 / 非莉莉白</option>
              <option value="lilly">莉莉白 (Lilly White)</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss-light">母亲 (Dam)</label>
            <select value={mother} onChange={(e) => setMother(e.target.value)} className="w-full bg-cream-DEFAULT p-5 rounded-global font-bold text-moss-dark focus:outline-none">
              <option value="normal">原始种 / 非莉莉白</option>
              <option value="lilly">莉莉白 (Lilly White)</option>
            </select>
          </div>
        </div>
        <div className="bg-moss-dark rounded-[2rem] p-8 text-cream-bright space-y-6">
          <h3 className="serif text-xl font-bold border-b border-white/10 pb-4">子代预期概率</h3>
          {currentResult.warning && <div className="bg-red-900/40 p-4 rounded-global flex items-center gap-3 text-red-100 text-xs"><AlertTriangle size={18} />{currentResult.warning}</div>}
          <div className="space-y-4">
            {currentResult.results.map((res, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase"><span>{res.label}</span><span>{res.percent}</span></div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden"><div className="h-full bg-earth transition-all" style={{ width: res.percent }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeding;
