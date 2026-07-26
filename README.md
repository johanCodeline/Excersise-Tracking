# Rebuild Protocol

Pure **HTML + JavaScript** field training tracker. No server, no install.

Open `field-training-tracker.html` in a browser.

## Project folder layout

JSON and pictures live **in this project folder**:

```text
Excersise-Tracking/
  field-training-tracker.html   ← the app
  state.json                    ← workouts, walks, weight, photo refs
  pictures/                     ← uploaded exercise photos
  README.md
```

## Connect the project folder (recommended)

1. Open `field-training-tracker.html` in **Chrome or Edge**
2. Tap **Project folder**
3. Select **this project folder** (the one that already contains the HTML file)
4. The app reads/writes:
   - `state.json` in the project root
   - photos into `pictures/`

Put the whole project in Dropbox/Google Drive if you want those same files to sync live across devices.

## On this device only

If the project folder is not connected, data stays in the browser. Use **Export JSON** / **Import JSON** and keep `state.json` inside the project folder.

## Photo uploads

- **Choose from device folder** — pick from Photos/Downloads/etc.
- File is **copied into project `pictures/`**
- **Choose from project pictures/** — reuse an existing project image
- **Take photo** — camera option

## Features

- Daily program (Push / Pull / Legs / Ruck / Full body / Recovery)
- Check off exercises, log walks, log body weight
- Form tips + exercise photos
- Progress streak and body-weight trend
