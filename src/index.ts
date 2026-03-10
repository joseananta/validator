const CODA = 'https://order-sg.codashop.com/initPayment.action'
const CODA_H: HeadersInit = { 'Content-Type': 'application/x-www-form-urlencoded' }
const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST',
  'Access-Control-Expose-Headers': '*',
}

interface R {
  success: boolean; game?: string; id?: number | string
  server?: string | number; name?: string; message?: string
}

const BAD: R = { success: false, message: 'Bad request' }
const NF: R = { success: false, message: 'Not found' }

const c = (b: string): Promise<any> =>
  fetch(CODA, { method: 'POST', headers: CODA_H, body: b }).then(r => r.json())

const b = (id: string, pp: number, pr: number, v: string, z: string | number = '', x = '') =>
  `voucherPricePoint.id=${pp}&voucherPricePoint.price=${pr}&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${z}&voucherTypeName=${v}&shopLang=id_ID${x}`

const gi_sv = (id: string): [string, string] | 0 =>
  id.startsWith('18') || id[0] === '8' ? ['Asia', 'os_asia']
  : id[0] === '6' ? ['America', 'os_usa']
  : id[0] === '7' ? ['Europe', 'os_euro']
  : id[0] === '9' ? ['SAR (Taiwan, Hong Kong, Macao)', 'os_cht'] : 0

const hsr_sv = (id: string): [string, string] | 0 =>
  id[0] === '6' ? ['America', 'prod_official_usa']
  : id[0] === '7' ? ['Europe', 'prod_official_eur']
  : id[0] === '8' ? ['Asia', 'prod_official_asia']
  : id[0] === '9' ? ['SAR (Taiwan, Hong Kong, Macao)', 'prod_official_cht'] : 0

const zzz_sv = (id: string): [string, string] | 0 => {
  const p = id.substring(0, 2)
  return p === '10' ? ['America', 'prod_gf_us']
    : p === '13' ? ['Asia', 'prod_gf_jp']
    : p === '15' ? ['Europe', 'prod_gf_eu']
    : p === '17' ? ['SAR (Taiwan, Hong Kong, Macao)', 'prod_gf_sg'] : 0
}

const LA_Z: Record<string, [string, number]> = {
  miskatown:[`MiskaTown`,500001],sandcastle:[`SandCastle`,500002],mouthswamp:[`MouthSwamp`,500003],
  redwoodtown:[`RedwoodTown`,500004],obelisk:[`Obelisk`,500005],newland:[`NewLand`,500006],
  chaosoutpost:[`ChaosOutpost`,500007],ironstride:[`IronStride`,500008],crystalthornsea:[`CrystalthornSea`,500009],
  fallforest:[`FallForest`,510001],mountsnow:[`MountSnow`,510002],nancycity:[`NancyCity`,520001],
  charlestown:[`CharlesTown`,520002],snowhighlands:[`SnowHighlands`,520003],santopany:[`Santopany`,520004],
  levincity:[`LevinCity`,520005],milestone:[`MileStone`,520006],chaoscity:[`ChaosCity`,520007],
  twinislands:[`TwinIslands`,520008],hopewall:[`HopeWall`,520009],labyrinthsea:[`LabyrinthSea`,520010],
}
const PGR_Z: Record<string, [string, string]> = {
  ap: ['Asia-Pacific','5000'], eu: ['Europe','5001'], na: ['North America','5002'],
}

const LD_J1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInNrdUlkXCI6XCIxXzEwMDBcIixcImV2ZW50UGFja2FnZVwiOlwiMFwiLFwiZGVub21JbWFnZVVybFwiOlwiaHR0cHM6Ly9jZG4xLmNvZGFzaG9wLmNvbS9pbWFnZXMvOTE2XzQ0Y2MyNmU3LWU3NDctNDk4NS04MzQ1LWZmODFjMGUwM2QxN19MT1ZFIERFRVBBLSBCQU5EIERFRVBBLSBQQUUNNFZBQ0tfaW1hZ2UvNjAgQ3J5c3RhbHMucG5nXCIsXCJkZW5vbU5hbWVcIjpcIjYwIENyeXN0YWxzXCIsXCJkZW5vbUNhdGVnb3J5TmFtZVwiOlwiQ3J5c3RhbFwiLFwidGFnc1wiOltdLFwiY291bnRyeTJOYW1lXCI6XCJJRFwiLFwibHZ0SWRcIjoxMTY4NCxcImRlZmF1bHRQcmljZVwiOjE5MDAwLjAsXCJkZWZhdWx0Q3VycmVuY3lcIjpcIklEUlwiLFwiYWRkaXRpb25hbEluZm9cIjp7XCJEeW5hbWljU2t1UHJvbW9EZXRhaWxcIjpcIm51bGxcIixcIkxveWFsdHlDdXJyZW5jeURldGFpbFwiOlwie1xcXCJwcmljaW5nU2NoZW1lXFxcIjpcXFwicGFpZF9jdXJyZW5jeVxcXCIsXFxcImxveWFsdHlFYXJuZWRBbW91bnRcXFwiOjAuMCxcXFwibG95YWx0eUJ1cm5lZEFtb3VudFxcXCI6MC4wfVwifX0ifQ.VsI9fduPyRDA1t_GOQ65cR88HJc_a93ROdy8Fsg8bEw'
const LD_J2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkeW5hbWljU2t1SW5mbyI6IntcInBjSWRcIjoyMjcsXCJwcmljZVwiOjE5MDAwLjAsXCJjdXJyZW5jeVwiOlwiSURSXCIsXCJhcGlQcmljZVwiOjE5MDAwLjAsXCJhcGlQcmljZUN1cnJlbmN5XCI6XCJJRFJcIixcImRpc2NvdW50UHJpY2VcIjoxOTAwMC4wLFwicHJpY2VCZWZvcmVUYXhcIjoxNzExNy4wLFwidGF4QW1vdW50XCI6MTg4My4wLFwic2t1SWRcIjpcIjFfMTAwMFwiLFwibHZ0SWRcIjoxMTY4NH0ifQ.nAclaCSG5o2xD9ccUuWTn3g8nC8Z7_nIDtj_qbCyQ0M'

type Detect = (id: string) => [string, string] | 0
const autoSv = (g: string, pp: number, pr: number, v: string, det: Detect) =>
  async (id: string): Promise<R> => {
    const sv = det(id); if (!sv) return NF
    const d = await c(b(id, pp, pr, v, sv[1]))
    return d.confirmationFields?.username
      ? { success: true, game: g, id: +id, server: sv[0], name: d.confirmationFields.username } : NF
  }

const H: Record<string, (id: string, sv?: string) => Promise<R>> = {
  aov: async id => {
    const d = await c(`user.userId=${id}&voucherPricePoint.id=7946&voucherPricePoint.price=10000&shopLang=id_ID&voucherTypeName=AOV`)
    const r = d.confirmationFields?.roles?.[0]
    return r ? { success: true, game: 'Garena: AOV (Arena Of Valor)', id: +id, name: r.role, server: r.server } : NF
  },
  codm: async id => {
    const d = await c(`user.userId=${id}&voucherPricePoint.id=46129&voucherPricePoint.price=10000&shopLang=id_ID&voucherTypeName=CALL_OF_DUTY`)
    const r = d.confirmationFields?.roles?.[0]
    return r ? { success: true, game: 'Call Of Duty Mobile', id: +id, name: r.role, server: r.server } : NF
  },
  ff: async id => {
    const d: any = await fetch(`https://gopay.co.id/games/v1/order/prepare/FREEFIRE?userId=${encodeURIComponent(id)}`).then(r => r.json())
    return { success: true, game: 'Garena Free Fire', id: +id, name: d.data }
  },
  gi:  autoSv('Genshin Impact', 116054, 16500, 'GENSHIN_IMPACT', gi_sv),
  hi: async id => {
    const d = await c(b(id, 48250, 16500, 'HONKAI_IMPACT'))
    return d.confirmationFields?.username
      ? { success: true, game: 'Honkai Impact 3rd', id: +id, name: d.confirmationFields.username } : NF
  },
  hsr: autoSv('Honkai: Star Rail', 855316, 16000, 'HONKAI_STAR_RAIL', hsr_sv),
  la: async (id, z) => {
    if (!z) return BAD
    const sv = LA_Z[z.toLowerCase()]; if (!sv) return NF
    const d = await c(b(id, 45713, 15000, 'NETEASE_LIFEAFTER', sv[1]))
    return d.confirmationFields?.username
      ? { success: true, game: 'LifeAfter', id: +id, server: sv[0], name: d.confirmationFields.username } : NF
  },
  ld: async id => {
    const d = await c(`voucherPricePoint.id=3&voucherPricePoint.price=19000&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=INFOLD_GAMES-LOVE_AND_DEEPSPACE&lvtId=11684&shopLang=id_ID&dynamicSkuToken=${LD_J1}&pricePointDynamicSkuToken=${LD_J2}`)
    return d.confirmationFields?.username
      ? { success: true, game: 'Love and Deepspace', id: +id, name: d.confirmationFields.username } : NF
  },
  mcgg: async (id, z) => {
    const d = await c(b(id, 997117, 1579, '106-MAGIC_CHESS', z ?? ''))
    return d.confirmationFields?.username
      ? { success: true, game: 'Magic Chess: Go Go', id: +id, server: z ? +z : undefined, name: d.confirmationFields.username } : NF
  },
  ml: async (id, z) => {
    const d = await c(b(id, 4150, 1579, 'MOBILE_LEGENDS', z ?? ''))
    return d.confirmationFields?.username
      ? { success: true, game: 'Mobile Legends: Bang Bang', id: +id, server: z ? +z : undefined, name: d.confirmationFields.username } : NF
  },
  pb: async id => {
    const d = await c(b(id, 54700, 11000, 'POINT_BLANK'))
    return d.confirmationFields?.username
      ? { success: true, game: 'Point Blank', id, name: d.confirmationFields.username } : NF
  },
  pgr: async (id, z) => {
    if (!z) return BAD
    const sv = PGR_Z[z.toLowerCase()]; if (!sv) return BAD
    const d = await c(b(id, 259947, 15000, 'PUNISHING_GRAY_RAVEN', sv[1]))
    return d.confirmationFields?.username
      ? { success: true, game: 'Punishing: Gray Raven', id: +id, server: sv[0], name: d.confirmationFields.username } : NF
  },
  sm: async id => {
    const d = await c(b(id, 256513, 16000, 'SAUSAGE_MAN', 'global-release'))
    return d.confirmationFields?.username
      ? { success: true, game: 'Sausage Man', id, name: d.confirmationFields.username } : NF
  },
  sus: async id => {
    const d = await c(b(id, 266077, 13000, 'SUPER_SUS'))
    return d.confirmationFields?.username
      ? { success: true, game: 'Super Sus', id: +id, name: d.confirmationFields.username } : NF
  },
  valo: async id => {
    const d = await c(b(id, 973634, 56000, 'VALORANT', '', '&voucherTypeId=109&gvtId=139'))
    if (d.success === true) return { success: true, game: 'VALORANT', id, server: 'Indonesia', name: d.confirmationFields.username }
    if (d.errorCode === -200) return { success: true, game: 'VALORANT', id, name: id }
    return NF
  },
  zzz: autoSv('Zenless Zone Zero', 946399, 16000, 'ZENLESS_ZONE_ZERO', zzz_sv),
}

export default {
  async fetch(req: Request, _env: unknown, ctx: ExecutionContext): Promise<Response> {
    const m = req.method
    if (m !== 'GET' && m !== 'HEAD' && m !== 'POST')
      return new Response('{"success":false,"message":"Method not allowed"}', {
        status: 405,
        headers: { 'Content-Type': 'application/json', Allow: 'GET,HEAD,POST', ...CORS },
      })

    const t = Date.now()
    const url = new URL(req.url)

    if (m === 'POST') {
      try {
        const ct = req.headers.get('content-type') ?? ''
        let d: Record<string, string>
        if (ct.includes('json')) d = await req.json()
        else if (ct.includes('form')) {
          d = {}; for (const [k, v] of (await req.formData()).entries()) d[k] = v as string
        } else d = {}
        for (const k in d) url.searchParams.set(k, d[k])
      } catch {}
    }

    const cache = caches.default
    const ck = url.href
    const hit = await cache.match(ck)
    if (hit) {
      const r = new Response(hit.body, hit)
      r.headers.set('X-Response-Time', String(Date.now() - t))
      r.headers.set('X-Cache', 'HIT')
      return r
    }

    const seg = url.pathname.split('/').filter(Boolean)
    const key = seg[0] ?? ''
    const id = seg[1] ?? url.searchParams.get('id') ?? undefined
    const sv = seg[2] ?? url.searchParams.get('server') ?? url.searchParams.get('zone') ?? undefined

    let result: R
    const handler = key ? H[key] : undefined
    if (!handler || !id) {
      result = BAD
    } else {
      try { result = await handler(id, sv) } catch { result = NF }
    }

    if (result.name) {
      if (result.game === 'Mobile Legends: Bang Bang') result.name = result.name.replace(/\+/g, '%20')
      if (url.searchParams.get('decode') !== 'false') result.name = decodeURIComponent(result.name)
    }

    const status = result.message === 'Bad request' ? 400 : result.message === 'Not found' ? 404 : 200
    const body = JSON.stringify(result)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=30, s-maxage=43200, immutable',
      'X-Response-Time': String(Date.now() - t),
      'X-Cache': 'MISS',
      ...CORS,
    }

    const res = new Response(body, { status, headers })
    ctx.waitUntil(cache.put(ck, new Response(body, { status, headers })))
    return res
  },
}
