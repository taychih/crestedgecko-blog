import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { 
  Thermometer, Droplets, Utensils, Clipboard, Plus, 
  History, Lock, ChevronLeft, Camera, Calendar, 
  User, Trash2, Info, Mars, Venus, HelpCircle 
} from 'lucide-react'

// 1. 注册路由
export const Route = createFileRoute('/Logbook')({
  component: LogbookPage,
})

function LogbookPage() {
  // 模拟当前登录用户，以后可以对接真正的 Auth
  const user = { name: "睫角玩家" };

  const [geckos, setGeckos] = useState([
    { 
      id: 1, 
      name: "小糯米", 
      morph: "莉莉白 (Lilly White)", 
      gender: 'Female', 
      acquiredDate: '2023-12-01', 
      image: 'https://picsum.photos/seed/gecko_log1/400/400', 
      logs: [{ id: 101, date: '2024-06-21', temp: '26℃', humidity: '75%', food: 'Pangea 无花果', notes: '蜕皮顺利，状态极佳' }] 
    },
    { 
      id: 2, 
      name: "大墨", 
      morph: "超级大麦町", 
      gender: 'Male', 
      acquiredDate: '2024-02-15', 
      image: 'https://picsum.photos/seed/gecko_log2/400/400', 
      logs: [] 
    }
  ]);

  const [selectedGeckoId, setSelectedGeckoId] = useState<number | null>(null);
  const selectedGecko = geckos.find(g => g.id === selectedGeckoId);

  const renderGenderIcon = (gender: string) => {
    switch(gender) {
      case 'Male': return <Mars size={14} className="text-blue-500" />;
      case 'Female': return <Venus size={14} className="text-pink-500" />;
      default: return <HelpCircle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 头部区域 */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          {selectedGeckoId ? (
            <button 
              onClick={() => setSelectedGeckoId(null)} 
              className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-widest mb-4 hover:opacity-70 transition-opacity"
            >
              <ChevronLeft size={16} /> 返回列表
            </button>
          ) : (
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-widest">
              <Lock size={12} /> 私密记录簿
            </div>
          )}
          <h1 className="text-4xl font-bold text-moss-dark">
            {selectedGeckoId ? selectedGecko?.name : `${user.name}的个人爬房`}
          </h1>
        </div>
        {!selectedGeckoId && (
          <button className="bg-moss-dark text-white px-8 py-4 rounded-global font-bold flex items-center gap-3 shadow-xl hover:bg-green-800 transition-colors">
            <Plus size={20} /> 添加成员
          </button>
        )}
      </div>

      {!selectedGeckoId ? (
        /* 守宫列表卡片 */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map(gecko => (
            <div 
              key={gecko.id} 
              onClick={() => setSelectedGeckoId(gecko.id)} 
              className="group bg-white rounded-global border border-green-900/10 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden bg-amber-50">
                <img src={gecko.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm">{renderGenderIcon(gecko.gender)}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-moss-dark">{gecko.name}</h3>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">{gecko.morph}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 详情与成长日记 */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-global border border-green-900/20 shadow-sm space-y-6">
              <img src={selectedGecko?.image} className="w-full aspect-square rounded-global object-cover shadow-inner" alt="" />
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-moss-dark">{selectedGecko?.name}</h2>
                <div className="inline-block text-xs font-bold text-green-800 bg-amber-50 px-4 py-1 rounded-full uppercase">
                  {selectedGecko?.morph}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b border-green-900/10 pb-4">
              <h3 className="text-xl font-bold text-moss-dark">成长日记</h3>
              <button className="bg-amber-800 text-white px-6 py-2 rounded-global text-[11px] font-bold uppercase tracking-widest hover:bg-amber-900 transition-colors">
                + 记录今日状态
              </button>
            </div>
            
            {selectedGecko?.logs.length ? selectedGecko.logs.map(log => (
              <div key={log.id} className="bg-white p-6 rounded-global border border-green-900/10 shadow-sm hover:border-green-900/30 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1">
                    <Calendar size={12} /> {log.date}
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-green-700">
                    <span className="flex items-center gap-1"><Thermometer size={12} /> {log.temp}</span>
                    <span className="flex items-center gap-1"><Droplets size={12} /> {log.humidity}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <Utensils size={14} className="text-amber-600 mt-1" />
                  <p className="text-sm font-bold text-moss-dark">喂食：{log.food}</p>
                </div>
                <p className="text-xs text-green-900/70 italic border-l-2 border-amber-800/20 pl-4 py-1">
                  “{log.notes}”
                </p>
              </div>
            )) : (
              <div className="text-center py-20 bg-amber-50/50 rounded-global border-2 border-dashed border-green-900/10 text-green-900/40">
                还没有记录，开始记录第一条日记吧！
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}