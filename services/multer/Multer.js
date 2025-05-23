const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save files in the 'uploads/reports' directory
        cb(null, path.join(__dirname, '../../UPLOAD/reports'));
    },
    filename: (req, file, cb) => {
        // Create a unique filename using timestamp and original file name
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

// Initialize multer
const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;
