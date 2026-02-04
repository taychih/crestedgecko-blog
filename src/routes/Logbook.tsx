import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { useState } from 'react'
import { getEvent } from 'vinxi/http'
import { 
  Thermometer, Droplets, Utensils, Plus, 
  ChevronLeft, Calendar, Mars, Venus, HelpCircle,
  Lock, Save, X, Trash2 // 使用了 Trash2 解决警告
} from 'lucide-react'

// --- 1. 后端数据库函数 (Server Functions) ---

const getDB = () => {
  const { context } = getEvent()
  return context.cloudflare.env.DB as D1Database
}

export const getGeckosFn = createServerFn('GET', async () => {
  const db = getDB()
  const { results: geckos } = await db.prepare('SELECT * FROM geckos ORDER BY id DESC').all()
  
  const enrichedGeckos = await Promise.all(geckos.map(async (gecko: any) => {
    const { results: logs } = await db
      .prepare('SELECT * FROM logs WHERE gecko_id = ? ORDER BY id DESC LIMIT 20')
      .bind(gecko.id)
      .all()
    return { ...gecko, logs }
  }))
  return enrichedGeckos
})

export const createGeckoFn = createServerFn('POST', async (payload: { name: string, morph: string, gender: string }) => {
  const db = getDB()
  const defaultImg = `https://picsum.photos/seed/${Math.random()}/400/400`
  await db.prepare('INSERT INTO geckos (name, morph, gender, image) VALUES (?, ?, ?, ?)')
    .bind(payload.name, payload.morph, payload.gender, defaultImg)
    .run()
  return { success: true }
})

/** 新增：删除守宫函数 */
export const deleteGeckoFn = createServerFn('POST', async (geckoId: number) => {
  const db = getDB()
  // 先删日志，再删守宫
  await db.prepare('DELETE FROM logs WHERE gecko_id = ?').bind(geckoId).run()
  await db.prepare('DELETE FROM geckos WHERE id = ?').bind(geckoId).run()
  return { success: true }
})

export const addLogFn = createServerFn('POST', async (payload: { geckoId: number, temp: string, humidity: string, food: string, notes: string }) => {
  const db = getDB()
  const date = new Date().toLocaleDateString('zh-CN')
  await db.prepare('INSERT INTO logs (gecko_id, log_date, temp, humidity, food, notes) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(payload.geckoId, date, payload.temp, payload.humidity, payload.food, payload.notes)
    .run()
  return { success: true }
})

// --- 2. 路由注册 ---

export const Route = createFileRoute('/Logbook')({
  loader: () => getGeckosFn(),
  component: LogbookPage,
})

// --- 3. 页面组件 ---

function LogbookPage() {
  const geckos = Route.useLoaderData()
  const router = useRouter()
  const [selectedGeckoId, setSelectedGeckoId] = useState<number | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  const selectedGecko = geckos.find((g: any) => g.id === selectedGeckoId)

  const handleQuickLog = async (geckoId: number) => {
    await addLogFn({
      geckoId,
      temp: '26℃',
      humidity: '75%',
      food: 'Pangea 混合果泥',
      notes: '日常记录：状态良好'
    })
    router.invalidate()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要移除这位成员吗？记录将无法找回。')) return
    await deleteGeckoFn(id)
    setSelectedGeckoId(null)
    router.invalidate()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          {selectedGeckoId ? (
            <button onClick={() => setSelectedGeckoId(null)} className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-widest mb-4 hover:opacity-70">
              <ChevronLeft size={16} /> 返回列表
            </button>
          ) : (
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-widest">
              <Lock size={12} /> D1 云端加密记录
            </div>
          )}
          <h1 className="text-4xl font-bold text-moss-dark">
            {selectedGeckoId ? selectedGecko?.name : `睫角玩家的个人爬房`}
          </h1>
        </div>
        {!selectedGeckoId && (
          <button onClick={() => setIsAddModalOpen(true)} className="bg-moss-dark text-white px-8 py-4 rounded-global font-bold flex items-center gap-3 shadow-xl hover:bg-green-800 transition-all">
            <Plus size={20} /> 添加成员
          </button>
        )}
      </div>

      {!selectedGeckoId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map((gecko: any) => (
            <div key={gecko.id} onClick={() => setSelectedGeckoId(gecko.id)} className="group bg-white rounded-global border border-green-900/10 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
              <img src={gecko.image} className="aspect-video w-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-moss-dark">{gecko.name}</h3>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">{gecko.morph}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-global border border-green-900/20 shadow-sm space-y-6">
              <img src={selectedGecko?.image} className="w-full aspect-square rounded-global object-cover" alt="" />
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-moss-dark">{selectedGecko?.name}</h2>
                {/* 解决 Trash2 未读报警：点击删除功能 */}
                <button 
                  onClick={() => handleDelete(selectedGecko.id)}
                  className="flex items-center gap-2 mx-auto text-red-400 hover:text-red-600 text-xs font-bold transition-colors"
                >
                  <Trash2 size={14} /> 移除成员
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b border-green-900/10 pb-4">
              <h3 className="text-xl font-bold text-moss-dark">成长日记</h3>
              <button onClick={() => handleQuickLog(selectedGecko.id)} className="bg-amber-800 text-white px-6 py-2 rounded-global text-[11px] font-bold uppercase tracking-widest hover:bg-amber-900">
                + 记录今日状态
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedGecko?.logs.map((log: any) => (
                <div key={log.id} className="bg-white p-6 rounded-global border border-green-900/10 shadow-sm hover:border-green-900/30 transition-colors">
                  <div className="flex justify-between mb-4">
                    <div className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1">
                      <Calendar size={12} /> {log.log_date}
                    </div>
                    <div className="flex gap-4 text-xs font-bold text-green-700">
                      <span className="flex items-center gap-1"><Thermometer size={12} /> {log.temp}</span>
                      <span className="flex items-center gap-1"><Droplets size={12} /> {log.humidity}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-moss-dark flex items-center gap-2"><Utensils size={14} className="text-amber-600" /> 喂食：{log.food}</p>
                  <p className="mt-3 text-xs text-green-900/70 italic border-l-2 border-amber-800/20 pl-4">“{log.notes}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddGeckoModal onClose={() => setIsAddModalOpen(false)} onRefresh={() => router.invalidate()} />
      )}
    </div>
  )
}

/** AddGeckoModal 保持不变 ... */
function AddGeckoModal({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) {
  const [name, setName] = useState('')
  const [morph, setMorph] = useState('莉莉白 (Lilly White)')
  const [gender, setGender] = useState('Female')

  const handleSave = async () => {
    if(!name) return
    await createGeckoFn({ name, morph, gender })
    onRefresh()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X size={20}/></button>
        <h2 className="text-2xl font-bold text-moss-dark mb-6">登记新成员</h2>
        <div className="space-y-4">
          <input placeholder="守宫昵称" className="w-full p-4 bg-amber-50 rounded-xl outline-none" value={name} onChange={e => setName(e.target.value)} />
          <select className="w-full p-4 bg-amber-50 rounded-xl outline-none" value={morph} onChange={e => setMorph(e.target.value)}>
            <option>莉莉白 (Lilly White)</option>
            <option>超级大麦町</option>
            <option>火团/双色</option>
          </select>
          <div className="flex gap-4">
            {['Male', 'Female', 'Unknown'].map(g => (
              <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${gender === g ? 'bg-moss-dark text-white' : 'bg-white text-gray-400 border-gray-100'}`}>
                {g === 'Male' ? '雄性' : g === 'Female' ? '雌性' : '未知'}
              </button>
            ))}
          </div>
          <button onClick={handleSave} className="w-full bg-moss-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
            <Save size={18} /> 存入云端
          </button>
        </div>
      </div>
    </div>
  )
}