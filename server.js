const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

const PORT = Number(process.env.PORT) || 3847;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const PICTURES_DIR = path.join(ROOT, "pictures");
const STATE_FILE = path.join(DATA_DIR, "state.json");
const PUBLIC_DIR = path.join(ROOT, "public");

const EMPTY_STATE = {
  logs: {},
  bodyweight: [],
  startWeight: null,
  walks: [],
  images: {},
};

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(PICTURES_DIR, { recursive: true });

if (!fs.existsSync(STATE_FILE)) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(EMPTY_STATE, null, 2));
}

function readState() {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...EMPTY_STATE,
      ...parsed,
      logs: parsed.logs || {},
      bodyweight: Array.isArray(parsed.bodyweight) ? parsed.bodyweight : [],
      walks: Array.isArray(parsed.walks) ? parsed.walks : [],
      images: parsed.images || {},
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}

function writeState(state) {
  const tmp = STATE_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, STATE_FILE);
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "photo";
}

function localAddresses() {
  const nets = os.networkInterfaces();
  const addrs = [];
  for (const entries of Object.values(nets)) {
    for (const net of entries || []) {
      if (net.family === "IPv4" && !net.internal) addrs.push(net.address);
    }
  }
  return addrs;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PICTURES_DIR),
  filename: (req, file, cb) => {
    const exercise = slugify(req.body.exercise || "photo");
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic"].includes(ext)
      ? ext
      : ".jpg";
    const id = crypto.randomBytes(4).toString("hex");
    cb(null, `${exercise}-${Date.now()}-${id}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use("/pictures", express.static(PICTURES_DIR, { maxAge: "7d" }));
app.use(express.static(PUBLIC_DIR));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    port: PORT,
    localUrls: [
      `http://localhost:${PORT}`,
      ...localAddresses().map((ip) => `http://${ip}:${PORT}`),
    ],
  });
});

app.get("/api/state", (_req, res) => {
  res.json(readState());
});

app.put("/api/state", (req, res) => {
  const incoming = req.body || {};
  const next = {
    logs: incoming.logs && typeof incoming.logs === "object" ? incoming.logs : {},
    bodyweight: Array.isArray(incoming.bodyweight) ? incoming.bodyweight : [],
    startWeight:
      typeof incoming.startWeight === "number" ? incoming.startWeight : null,
    walks: Array.isArray(incoming.walks) ? incoming.walks : [],
    images:
      incoming.images && typeof incoming.images === "object"
        ? incoming.images
        : {},
  };
  writeState(next);
  res.json(next);
});

app.post("/api/pictures", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No photo uploaded" });
  }
  const exercise = String(req.body.exercise || "").trim();
  if (!exercise) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: "Exercise name required" });
  }

  const url = `/pictures/${req.file.filename}`;
  const state = readState();
  const previous = state.images[exercise];
  if (previous && previous.startsWith("/pictures/")) {
    const oldPath = path.join(PICTURES_DIR, path.basename(previous));
    if (fs.existsSync(oldPath)) {
      try {
        fs.unlinkSync(oldPath);
      } catch {
        /* keep going */
      }
    }
  }
  state.images[exercise] = url;
  writeState(state);
  res.json({ url, images: state.images });
});

app.delete("/api/pictures", (req, res) => {
  const exercise = String((req.body && req.body.exercise) || "").trim();
  if (!exercise) {
    return res.status(400).json({ error: "Exercise name required" });
  }
  const state = readState();
  const previous = state.images[exercise];
  if (previous && previous.startsWith("/pictures/")) {
    const oldPath = path.join(PICTURES_DIR, path.basename(previous));
    if (fs.existsSync(oldPath)) {
      try {
        fs.unlinkSync(oldPath);
      } catch {
        /* ignore */
      }
    }
  }
  delete state.images[exercise];
  writeState(state);
  res.json({ images: state.images });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(400).json({ error: err.message || "Request failed" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  const urls = [
    `http://localhost:${PORT}`,
    ...localAddresses().map((ip) => `http://${ip}:${PORT}`),
  ];
  console.log("Rebuild Protocol running");
  console.log(`  Data:     ${STATE_FILE}`);
  console.log(`  Pictures: ${PICTURES_DIR}`);
  urls.forEach((u) => console.log(`  Open:     ${u}`));
  console.log("Open any of those URLs on phone/tablet/PC on the same network.");
});
