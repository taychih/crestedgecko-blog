// src/features/logbook/logbook.server.ts

async function getD1(event: any) {
  // 确保这里路径正确
  return event.context.cloudflare.env.DB as D1Database
}

export const getGeckosAction = async (event: any) => {
  const db = await getD1(event)
  const { results: geckos } = await db.prepare('SELECT * FROM geckos ORDER BY id DESC').all()
  return await Promise.all(geckos.map(async (gecko: any) => {
    const { results: logs } = await db
      .prepare('SELECT * FROM logs WHERE gecko_id = ? ORDER BY id DESC LIMIT 20')
      .bind(gecko.id).all()
    return { ...gecko, logs }
  }))
}

// ✅ 检查这个名字是否拼写正确
export const createGeckoAction = async (event: any, payload: { name: string, morph: string, gender: string }) => {
  const db = await getD1(event)
  const defaultImg = `https://picsum.photos/seed/${Math.random()}/400/400`
  await db.prepare('INSERT INTO geckos (name, morph, gender, image) VALUES (?, ?, ?, ?)')
    .bind(payload.name, payload.morph, payload.gender, defaultImg).run()
  return { success: true }
}

export const deleteGeckoAction = async (event: any, geckoId: number) => {
  const db = await getD1(event)
  await db.prepare('DELETE FROM logs WHERE gecko_id = ?').bind(geckoId).run()
  await db.prepare('DELETE FROM geckos WHERE id = ?').bind(geckoId).run()
  return { success: true }
}

export const addLogAction = async (event: any, payload: { geckoId: number, temp: string, humidity: string, food: string, notes: string }) => {
  const db = await getD1(event)
  const date = new Date().toLocaleDateString('zh-CN')
  await db.prepare('INSERT INTO logs (gecko_id, log_date, temp, humidity, food, notes) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(payload.geckoId, date, payload.temp, payload.humidity, payload.food, payload.notes).run()
  return { success: true }
}