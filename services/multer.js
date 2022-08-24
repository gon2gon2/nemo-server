import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {

    cb(null, `${Date.now()}-${ (Math.random() + 1).toString(36).substring(7) + path.extname(file.originalname) }`);  
}
})
export default multer({ storage }); 