/*  명함을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import { Router } from 'express';
import multer from 'multer';
import tags from '../controllers/tag.controller.js';
import db from '../models/index.js'

const { Card } = db;

const router = Router();

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename:  (req, file, cb) => {
    cb(null, `${Date.now()  }-${  file.originalname}`)// 파일 원본이름 저장
  }
})

const upload = multer({ storage }); // 미들웨어 생성


// const find_name_with_id = (tag_id) => {
//   Tag.findAll({
//     where : {
//         id: parseInt(tag_id)
//       }
//   }).then((data)=>data[0].tag_name
//     )
// }

// const tag_name_to_id = (tag_name) => {
//   Tag.findAll({
//     where : {
//         tag_name
//       }
//   }).then((data)=>data[0].tag_id
//     )
// }
export default app => {

  router.post('/create', upload.single('image'), (req, res)=> {
    // const {user_id, nickname, tag_1, tag_2, tag_3, intro} = req.body;
    const {user_id, nickname, intro} = req.body;
    // Card.create({user_id, nickname, tag_1, tag_2, tag_3})
    // Card.create({user_id, nickname, tag_1, tag_2, tag_3})
    const tag_id_1 = 1;
    const tag_id_2 = 2;
    const tag_id_3 = 3;
    const img_url = req.file.path
    const new_card = {user_id, nickname, tag_id_1, tag_id_2, tag_id_3, img_url, intro}
    console.log(new_card);
    Card.create(new_card)
      .then(()=>{
        res.status(201).send({
          "result" : "success",
          "new_card": new_card
        });
      })
      .catch(()=>{
        res.status(500).send({
          result:"fail"
        })
      })
  });

  router.post('/tag', tags.create);
  // router.get('/tag/:tag_id', tags.find)

  app.use('/api/card', router);
};
