
import React, { useState } from 'react';
import { 
  Thermometer, Droplets, Utensils, Clipboard, Plus, 
  History, Lock, ChevronLeft, Camera, Calendar, 
  User, Trash2, Info, Mars, Venus, HelpCircle 
} from 'lucide-react';

interface LogEntry { id: number; date: string; temp: string; humidity: string; food: string; notes: string; }
interface Gecko { id: number; name: string; morph: string; gender: 'Male' | 'Female' | 'Unknown'; acquiredDate: string; image?: string; logs: LogEntry[]; }

const Logbook: React.FC<{ user: any }> = ({ user }) => {
  const [geckos, setGeckos] = useState<Gecko[]>([
    { id: 1, name: "小糯米", morph: "莉莉白 (Lilly White)", gender: 'Female', acquiredDate: '2023-12-01', image: 'https://picsum.photos/seed/gecko_log1/400/400', logs: [{ id: 101, date: '2024-06-21', temp: '26℃', humidity: '75%', food: 'Pangea 无花果', notes: '蜕皮顺利，状态极佳' }] },
    { id: 2, name: "大墨", morph: "超级大麦町", gender: 'Male', acquiredDate: '2024-02-15', image: 'https://picsum.photos/seed/gecko_log2/400/400', logs: [] }
  ]);
  const [selectedGeckoId, setSelectedGeckoId] = useState<number | null>(null);
  const [isAddingGecko, setIsAddingGecko] = useState(false);
  const [isAddingLog, setIsAddingLog] = useState(false);
  const selectedGecko = geckos.find(g => g.id === selectedGeckoId);

  const renderGenderIcon = (gender: Gecko['gender']) => {
    switch(gender) {
      case 'Male': return <Mars size={14} className="text-blue-500" />;
      case 'Female': return <Venus size={14} className="text-pink-500" />;
      default: return <HelpCircle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          {selectedGeckoId ? (
            <button onClick={() => setSelectedGeckoId(null)} className="flex items-center gap-2 text-earth font-bold text-sm uppercase tracking-widest mb-4"><ChevronLeft size={16} /> 返回列表</button>
          ) : (
            <div className="flex items-center gap-2 text-earth font-bold text-xs uppercase tracking-widest"><Lock size={12} /> 私密记录簿</div>
          )}
          <h1 className="serif text-4xl font-bold text-moss-dark">
            {selectedGeckoId ? selectedGecko?.name : user?.name + "的个人爬房"}
          </h1>
        </div>
        {!selectedGeckoId && (
          <button onClick={() => setIsAddingGecko(true)} className="bg-moss text-cream-DEFAULT px-8 py-4 rounded-global font-bold flex items-center gap-3 shadow-xl hover:bg-moss-dark">+ 添加成员</button>
        )}
      </div>

      {!selectedGeckoId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map(gecko => (
            <div key={gecko.id} onClick={() => setSelectedGeckoId(gecko.id)} className="group bg-white rounded-global border border-moss-light/10 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden">
              <div className="aspect-video relative overflow-hidden bg-cream-dark">
                <img src={gecko.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">{renderGenderIcon(gecko.gender)}</div>
              </div>
              <div className="p-6">
                <h3 className="serif text-2xl font-bold text-moss-dark">{gecko.name}</h3>
                <p className="text-xs text-earth font-bold uppercase tracking-widest">{gecko.morph}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-global border border-moss-light/20 shadow-sm space-y-6">
              <img src={selectedGecko?.image} className="w-full aspect-square rounded-global object-cover" alt="" />
              <div className="text-center space-y-2">
                <h2 className="serif text-3xl font-bold text-moss-dark">{selectedGecko?.name}</h2>
                <div className="text-xs font-bold text-moss-light bg-cream-dark px-4 py-1 rounded-full uppercase">{selectedGecko?.morph}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b border-moss-light/10 pb-4">
              <h3 className="serif text-xl font-bold text-moss-dark">成长日记</h3>
              <button onClick={() => setIsAddingLog(true)} className="bg-earth text-moss-dark px-6 py-2 rounded-global text-[11px] font-bold uppercase tracking-widest">+ 记录今日状态</button>
            </div>
            {selectedGecko?.logs.map(log => (
              <div key={log.id} className="bg-white p-6 rounded-global border border-moss-light/10 shadow-sm">
                <div className="flex justify-between mb-4">
                  <div className="text-xs font-mono font-bold text-earth">{log.date}</div>
                  <div className="flex gap-4 text-xs font-bold text-moss-light">
                    <span>Temp: {log.temp}</span>
                    <span>Humidity: {log.humidity}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-moss-dark mb-2">喂食：{log.food}</p>
                <p className="text-xs text-moss-light italic border-l-2 border-earth/20 pl-4">“{log.notes}”</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Logbook;
