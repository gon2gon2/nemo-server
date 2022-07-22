import { Router } from 'express';

const router = Router();

export default app => {
  router.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.use('/', router);
};
