/*  명함을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import { Router } from 'express';
import cards from '../controllers/card.controller.js';

const router = Router();

export default app => {

  // url에 적절한 컨트롤러 메소드를 할당해줍니다.
  router.get('/', cards.create);

  app.use('/api/card', router);
};
