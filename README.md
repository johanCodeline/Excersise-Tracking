# Rebuild Protocol — Cross-device Field Training Log

A workable workout tracker that stores everything in **JSON files** and **picture folders**, so phone, tablet, and PC can share the same data (Dropbox-style on your own machine/network).

## What you get

- Daily program (Push / Pull / Legs / Ruck / Full body / Recovery)
- Check off exercises, log walks, log body weight
- Form tips + exercise photos
- Shared persistence:
  - `data/state.json` — workouts, walks, weight, image references
  - `pictures/` — uploaded photos

## Quick start

```bash
npm install
npm start
```

Then open one of the printed URLs, for example:

- On this computer: `http://localhost:3847`
- On your phone (same Wi‑Fi): `http://YOUR-LAN-IP:3847`

Use **Copy link** in the app header to grab the shareable address.

## How cross-device sharing works

1. Keep `npm start` running on one always-on machine (laptop/PC/home server).
2. Open the LAN URL on any other device on the same network.
3. Changes write to `data/state.json`.
4. Photos upload into `pictures/` and are served to every device.
5. The app polls every few seconds so another device’s updates appear automatically.

This is local Dropbox-style sharing: one host, many clients, no cloud account required.

## Data layout

```text
data/
  state.json          # live shared state
  state.example.json  # starter shape
pictures/             # uploaded exercise photos
public/               # web app UI
server.js             # Express API + static host
```

`state.json` shape:

```json
{
  "logs": { "2026-07-26": { "done": { "0": true }, "dayName": "PUSH" } },
  "bodyweight": [{ "date": "2026-07-26", "kg": 82.4 }],
  "startWeight": 84.0,
  "walks": [{ "date": "2026-07-26", "km": 3.2, "mins": 35 }],
  "images": { "Push-ups": "/pictures/push-ups-….jpg" }
}
```

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Server status + LAN URLs |
| GET | `/api/state` | Read shared JSON |
| PUT | `/api/state` | Save shared JSON |
| POST | `/api/pictures` | Upload photo (`multipart`: `exercise`, `photo`) |
| DELETE | `/api/pictures` | Remove photo for an exercise |

## Notes

- Default port: `3847` (override with `PORT=3000 npm start`)
- Uploads accept common image types up to 12 MB
- Keep the host machine awake while you want live sync
- For access away from home, put this behind a VPN or reverse proxy you control
