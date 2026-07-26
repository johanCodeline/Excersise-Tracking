# Rebuild Protocol

Pure **HTML + JavaScript** field training tracker. No server, no install.

Open `field-training-tracker.html` in a browser.

## Project folder layout

```text
Excersise-Tracking/
  field-training-tracker.html   ← the app
  state.json                    ← workouts, walks, weight, photo refs
  pictures/                     ← uploaded exercise photos
  README.md
```

Keep this whole project inside **Dropbox** so every device sees the same `state.json` and `pictures/`.

## Open Dropbox on devices

In the app header (and Progress tab):

- **Open Dropbox** — opens the Dropbox app or website on phone/PC
- **Import from Dropbox** — pick `state.json` from Dropbox (Files → Locations → Dropbox, or Dropbox Chooser)
- **Choose from Dropbox** (photo modal) — pick an image from Dropbox; it is copied into project `pictures/`

### Optional Dropbox Chooser

Under **Progress**, paste a free Dropbox App key (Dropbox Developer Console → create app → App key). Then Import / Choose from Dropbox opens Dropbox’s own picker inside the browser.

## Connect the project folder (desktop)

1. Put this project inside your Dropbox folder
2. Open the HTML in Chrome/Edge
3. Tap **Project folder**
4. In the picker open **Dropbox → this project**
5. Saves go to `state.json` + `pictures/` in that same project folder

## Features

- Daily program (Push / Pull / Legs / Ruck / Full body / Recovery)
- Check off exercises, log walks, log body weight
- Form tips + exercise photos
- Progress streak and body-weight trend
