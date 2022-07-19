import { Router } from 'express';
import connections from '../controllers/connection.controller.js'

const router = Router();

export default app => {

  router.get('/all', async (req, res)=> {
    const {user_id} = req.query;
    const friends = await connections.findAllFriends(user_id)
    res.send(friends)
  });

  // 쿼리스트링사용
  router.get('/', async (req, res)=> {
    const { id_1, id_2 } = req.query;

    const result_1 = await connections.isFriend(id_1, id_2)? true : await connections.connect(id_1, id_2);
    const result_2 = await connections.isFriend(id_2, id_1)? true : await connections.connect(id_2, id_1);

    if (result_1 && result_2){
      res.status(200).send({"result": "success"})
    } else {
      res.status(400).send({"result": "fail"})
    }
  })

  // json방식으로
  router.post('/', async (req, res)=> {
      const {id_1, id_2} = req.body

      const result_1 = await connections.isFriend(id_1, id_2)? true : await connections.connect(id_1, id_2);
      const result_2 = await connections.isFriend(id_2, id_1)? true : await connections.connect(id_2, id_1);

      if (result_1 && result_2){
        res.status(200).send({"result": "success"})
      } else {
        res.status(400).send({"result": "fail"})
      }
  })


  router.get('/delete', async (req, res)=> {
    const { id_1, id_2 } = req.query;

    const result_1 = await connections.isFriend(id_1, id_2)? await connections.connect(id_1, id_2) : connections.disconnect(id_1, id_2) ;
    const result_2 = await connections.isFriend(id_2, id_1)? await connections.connect(id_2, id_1) : connections.disconnect(id_2, id_1);

    if (result_1 && result_2){
      res.status(200).send({"result": "success"})
    } else {
      res.status(400).send({"result": "fail"})
    }
  })
  
  app.use('/api/friend', router);
};