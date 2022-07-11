/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

import profiles from '../controllers/profile.controller.js';
import { Router } from 'express';
const router = Router();

export default app => {

  router.get('/', profiles.create);

  app.use('/api/profile', router);
};
