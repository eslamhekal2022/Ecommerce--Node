import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // تحديد مكان تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // تحديد اسم الصورة
  },
});

const upload = multer({ storage });

export default upload;