// middleware/upload.js
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads", "users");

// Asegurar existencia de la carpeta
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    cb(null, `user_${base}${ext}`);
  },
});

// Filtro: permitir solo imágenes
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeok = allowed.test(file.mimetype);
  const extok = allowed.test(ext);
  if (mimeok && extok) cb(null, true);
  else cb(new Error("Only image files are allowed (jpeg, png, webp, gif)"));
}

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});
