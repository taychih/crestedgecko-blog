import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { 
  Thermometer, Droplets, Utensils, Plus, 
  ChevronLeft, Calendar, Mars, Venus, HelpCircle,
  Lock, Save, X, Trash2 
} from 'lucide-react'

// 引入纯逻辑 Action（确保这个文件里没有引入 vinxi 或 @tanstack/start）
import { 
  getGeckosAction,
  createGeckoAction,
  deleteGeckoAction,
  addLogAction
} from '../features/logbook/logbook.server'

// --- 核心修复：彻底逃避 Vite 客户端扫描的辅助函数 ---
const getServerEvent = async () => {
  // 1. 如果在浏览器环境，直接返回 null
  if (typeof window !== 'undefined' || !import.meta.env.SSR) return null;
  
  try {
    // 2. 这里的关键：使用变量名而非直接在 import() 中写字符串
    // 配合 @vite-ignore，Vite 构建工具会跳过对这个模块的深度依赖扫描
    const vinxiModule = 'vinxi/http';
    const { getEvent } = await import(/* @vite-ignore */ vinxiModule);
    return getEvent();
  } catch (e) {
    console.error('服务端获取 Event 失败:', e);
    return null;
  }
};

// --- RPC 包装函数 (Server Functions) ---

export const getGeckosFn = createServerFn('GET', async () => {
  const event = await getServerEvent();
  if (!event) return []; // 客户端安全占位符
  return getGeckosAction(event);
})

export const createGeckoFn = createServerFn('POST', async (payload: { name: string, morph: string, gender: string }) => {
  const event = await getServerEvent();
  if (!event) return { success: false };
  return createGeckoAction(event, payload);
})

export const deleteGeckoFn = createServerFn('POST', async (geckoId: number) => {
  const event = await getServerEvent();
  if (!event) return { success: false };
  return deleteGeckoAction(event, geckoId);
})

export const addLogFn = createServerFn('POST', async (payload: { geckoId: number, temp: string, humidity: string, food: string, notes: string }) => {
  const event = await getServerEvent();
  if (!event) return { success: false };
  return addLogAction(event, payload);
})

// --- 路由注册 ---

export const Route = createFileRoute('/Logbook')({
  loader: () => getGeckosFn(),
  component: LogbookPage,
})

// --- 页面组件 ---

function LogbookPage() {
  const geckos = Route.useLoaderData()
  const router = useRouter()
  const [selectedGeckoId, setSelectedGeckoId] = useState<number | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const selectedGecko = geckos.find((g: any) => g.id === selectedGeckoId)

  // 性别图标渲染
  const renderGenderIcon = (gender: string) => {
    switch (gender) {
      case 'Male': return <Mars className="w-4 h-4 text-blue-400" />
      case 'Female': return <Venus className="w-4 h-4 text-pink-400" />
      default: return <HelpCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题栏 */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-200 bg-clip-text text-transparent">
              守宫日记 Logbook
            </h1>
            <p className="text-gray-400 text-sm mt-1">管理你的睫角守宫家族与健康记录</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-all shadow-lg shadow-orange-900/20"
          >
            <Plus className="w-5 h-5" />
            <span>添加成员</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧：列表展示 */}
          <div className="lg:col-span-4 space-y-4 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {geckos.map((gecko: any) => (
              <div 
                key={gecko.id}
                onClick={() => setSelectedGeckoId(gecko.id)}
                className={`group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all ${
                  selectedGeckoId === gecko.id 
                  ? 'bg-orange-500/10 border-orange-500/50 shadow-inner' 
                  : 'bg-[#252525] border-transparent hover:border-gray-600'
                }`}
              >
                <img src={gecko.image} alt={gecko.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-orange-400 transition-all" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{gecko.name}</h3>
                    {renderGenderIcon(gecko.gender)}
                  </div>
                  <p className="text-sm text-gray-400">{gecko.morph}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 右侧：详情展示与记录 */}
          <div className="lg:col-span-8 bg-[#252525] rounded-2xl p-6 border border-gray-800 relative min-h-[500px]">
            {selectedGecko ? (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-6 items-center">
                    <img src={selectedGecko.image} alt={selectedGecko.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-[#1a1a1a]" />
                    <div>
                      <h2 className="text-4xl font-black mb-1">{selectedGecko.name}</h2>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Mars className="w-4 h-4" /> {selectedGecko.gender}</span>
                        <span className="flex items-center gap-1"><Utensils className="w-4 h-4" /> {selectedGecko.morph}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm('确定要移除这位成员吗？')) {
                        deleteGeckoFn(selectedGecko.id).then(() => router.invalidate())
                      }
                    }}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>

                {/* 快速日志表单 */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl mb-8 border border-gray-800">
                  <h3 className="text-sm font-semibold mb-3 text-gray-500 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> 快速添加记录
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="text-gray-500">温度</span>
                      <input id={`temp-${selectedGecko.id}`} placeholder="26℃" className="bg-[#2a2a2a] border-none rounded p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none" />
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="text-gray-500">湿度</span>
                      <input id={`humi-${selectedGecko.id}`} placeholder="75%" className="bg-[#2a2a2a] border-none rounded p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none" />
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="text-gray-500">投喂食物</span>
                      <input id={`food-${selectedGecko.id}`} placeholder="Pangea 果泥" className="bg-[#2a2a2a] border-none rounded p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none" />
                    </div>
                    <button 
                      onClick={async () => {
                        const temp = (document.getElementById(`temp-${selectedGecko.id}`) as HTMLInputElement).value
                        const humidity = (document.getElementById(`humi-${selectedGecko.id}`) as HTMLInputElement).value
                        const food = (document.getElementById(`food-${selectedGecko.id}`) as HTMLInputElement).value
                        await addLogFn({ geckoId: selectedGecko.id, temp, humidity, food, notes: '快速记录' })
                        router.invalidate()
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded self-end transition-colors shadow-lg shadow-orange-900/20"
                    >
                      保存记录
                    </button>
                  </div>
                </div>

                {/* 历史记录列表 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-orange-400 flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5" /> 历史日志
                  </h3>
                  {selectedGecko.logs.length > 0 ? (
                    selectedGecko.logs.map((log: any) => (
                      <div key={log.id} className="bg-[#1e1e1e] p-4 rounded-lg border-l-4 border-orange-500 flex justify-between items-center group hover:bg-[#252525] transition-colors">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500 font-mono mb-1">{log.log_date}</div>
                          <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-1 text-blue-300"><Thermometer className="w-3 h-3" /> {log.temp}</span>
                            <span className="flex items-center gap-1 text-cyan-300"><Droplets className="w-3 h-3" /> {log.humidity}</span>
                            <span className="flex items-center gap-1 text-green-300"><Utensils className="w-3 h-3" /> {log.food}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 italic group-hover:text-gray-400 transition-colors">
                          {log.notes}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-600 border-2 border-dashed border-gray-800 rounded-xl">
                      暂无历史记录
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600">
                <ChevronLeft className="w-12 h-12 mb-2 animate-pulse" />
                <p className="text-xl">请在左侧选择一位成员</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 添加成员模态框 */}
      {isAddModalOpen && (
        <AddGeckoModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={() => {
            setIsAddModalOpen(false)
            router.invalidate()
          }} 
        />
      )}
    </div>
  )
}

// 模态框组件
function AddGeckoModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [name, setName] = useState('')
  const [morph, setMorph] = useState('')
  const [gender, setGender] = useState('Unknown')

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#252525] border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-orange-400">登记新成员</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-full transition-colors"><X /></button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">名字</label>
            <input 
              autoFocus
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 outline-none focus:border-orange-500 transition-all"
              placeholder="例如：蛋挞"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">品种/基因</label>
            <input 
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 outline-none focus:border-orange-500 transition-all"
              placeholder="例如：黄莉莉 Lily White"
              value={morph}
              onChange={e => setMorph(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">性别</label>
            <div className="flex gap-2">
              {['Male', 'Female', 'Unknown'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg border transition-all ${
                    gender === g ? 'bg-orange-500 border-orange-400 text-white' : 'bg-[#1a1a1a] border-gray-800 text-gray-400'
                  }`}
                >
                  {g === 'Male' ? '公' : g === 'Female' ? '母' : '未知'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#1e1e1e] flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-gray-400 hover:text-white transition-colors">取消</button>
          <button 
            onClick={async () => {
              if(!name) return alert('请输入名字')
              await createGeckoFn({ name, morph, gender })
              onSuccess()
            }}
            className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-orange-900/20 transition-all"
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  )
}