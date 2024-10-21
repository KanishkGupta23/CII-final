const multer = require("multer");

// Configure storage in memory
const storage = multer.memoryStorage();

// Set file size limit to 5 MB
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

// Configure the file filter
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: (req, file, cb) => {
    // Accept image files and document files (PDF, DOC, DOCX)
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = fileTypes.test(file.mimetype);
    const extname2 = fileTypes.test(file.originalname.split('.').pop().toLowerCase());

    if (!extname && !extname2) {
      return cb(new Error("Only image and document files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
