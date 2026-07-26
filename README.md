# Rebuild Protocol

Pure **HTML + JavaScript** field training tracker. No server, no install.

Open `field-training-tracker.html` in a browser.

## Can JSON be saved on the device or Dropbox?

Yes — both.

| Mode | Where JSON lives | Multi-device |
|------|------------------|------------|
| **On this device** | Browser storage on that phone/PC | No (one device) |
| **Dropbox folder** | `state.json` + `pictures/` inside a Dropbox (or Drive) folder | Yes — live sync on desktops |

When Dropbox folder mode is on, the app also keeps a backup copy on the device.

## Live multi-device (Dropbox)

1. Install Dropbox and create a folder, e.g. `RebuildProtocol`
2. Open this HTML in **Chrome or Edge**
3. Tap **Dropbox folder** and choose that folder
4. The app writes:
   - `state.json` — workouts, walks, weight, photo links
   - `pictures/` — exercise photos
5. On another PC with the same Dropbox folder: open the HTML → connect that folder
6. Changes sync through Dropbox; the app checks for updates every few seconds (**Refresh now** forces a pull)

## Phones

Most phone browsers cannot attach a live folder. Use:

1. **Export JSON** on one device
2. Save/share `state.json` through the Dropbox app
3. **Import JSON** on the other device

## Features

- Daily program (Push / Pull / Legs / Ruck / Full body / Recovery)
- Check off exercises, log walks, log body weight
- Form tips + exercise photos
- Progress streak and body-weight trend
