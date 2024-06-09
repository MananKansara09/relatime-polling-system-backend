import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, '..', 'public', 'photos');

// Ensure the directory exists or create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use the predefined uploadDir
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
})

const upload = multer({ storage: storage });
export default upload;
