# Rebuild Protocol

Pure **HTML + JavaScript** field training tracker. No server, no install.

Open `field-training-tracker.html` in a browser.

## Cross-device sharing (Dropbox-style)

The app saves to **JSON** and a **pictures folder** so you can share across devices.

### Best option (Chrome / Edge on desktop)

1. Create a folder in Dropbox or Google Drive, e.g. `RebuildProtocol`
2. Open the HTML file
3. Click **Connect folder** and pick that folder
4. The app writes:
   - `state.json` — workouts, walks, body weight, photo references
   - `pictures/` — uploaded exercise photos
5. Dropbox/Drive syncs that folder to your other devices

On another computer with Chrome/Edge, open the same HTML file and **Connect folder** to the synced folder.

### Phone / Safari / other browsers

Use **Export JSON** / **Import JSON**:

1. Export `state.json` on one device
2. Put it in Dropbox/Drive (or AirDrop it)
3. Import it on the other device

Photos can still be added; without a connected folder they are stored inside the JSON file.

## Features

- Daily program (Push / Pull / Legs / Ruck / Full body / Recovery)
- Check off exercises, log walks, log body weight
- Form tips + exercise photos
- Progress streak and body-weight trend
- Local browser save when no folder is connected

## Files

- `field-training-tracker.html` — the whole app
