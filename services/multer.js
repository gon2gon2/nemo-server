import multer from 'multer';

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename:  (req, file, cb) => {
    cb(null, `${Date.now()  }-${  file.originalname}`)// 파일 원본이름 저장
  }
})

export default multer({ storage }); // 미들웨어 생성