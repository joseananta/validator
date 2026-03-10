# Game ID Validator API

Cloudflare Worker untuk validasi ID game. Mendukung 16 game.

Dibuat ulang dari [ihsangan/valid](https://github.com/ihsangan/valid) dengan kode yang lebih efisien dan ringan (single-file, zero dependencies).

## Base URL

```
https://<your-worker>.workers.dev
```

## Format

```
GET /{game}/{id}
GET /{game}/{id}/{server}
```

## Games

| Game | Path | Contoh |
|------|------|--------|
| Mobile Legends | `/ml/{id}/{zone}` | `/ml/123456/5678` |
| Magic Chess: Go Go | `/mcgg/{id}/{zone}` | `/mcgg/123456/5678` |
| Genshin Impact | `/gi/{id}` | `/gi/800123456` |
| Honkai: Star Rail | `/hsr/{id}` | `/hsr/800123456` |
| Honkai Impact 3rd | `/hi/{id}` | `/hi/12345678` |
| Zenless Zone Zero | `/zzz/{id}` | `/zzz/1300123456` |
| Free Fire | `/ff/{id}` | `/ff/123456789` |
| VALORANT | `/valo/{id}` | `/valo/abc123` |
| Call Of Duty Mobile | `/codm/{id}` | `/codm/123456` |
| Arena Of Valor | `/aov/{id}` | `/aov/123456` |
| LifeAfter | `/la/{id}/{server}` | `/la/123456/miskatown` |
| Love and Deepspace | `/ld/{id}` | `/ld/123456` |
| Punishing: Gray Raven | `/pgr/{id}/{zone}` | `/pgr/123456/ap` |
| Point Blank | `/pb/{id}` | `/pb/username` |
| Sausage Man | `/sm/{id}` | `/sm/username` |
| Super Sus | `/sus/{id}` | `/sus/123456` |

## Response

### Berhasil

```json
{
  "success": true,
  "game": "Mobile Legends: Bang Bang",
  "id": 123456,
  "server": 5678,
  "name": "PlayerName"
}
```

### Tidak Ditemukan

```json
{
  "success": false,
  "message": "Not found"
}
```

### Bad Request (ID kosong / game tidak valid)

```json
{
  "success": false,
  "message": "Bad request"
}
```

## Parameter Opsional

| Param | Keterangan |
|-------|------------|
| `decode=false` | Tidak decode nama (default: auto decode) |

Contoh: `/ml/123456/5678?decode=false`

## Method

Mendukung `GET`, `HEAD`, dan `POST`.

POST bisa kirim body `application/json` atau `application/x-www-form-urlencoded`.

## Deploy

```bash
npm install
npx wrangler deploy
```

## Dev

```bash
npm run dev
```
