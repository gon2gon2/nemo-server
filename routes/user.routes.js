/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

const router = require('express').Router();
const users = require('../controllers/user.controller');

module.exports = app => {

  router.get('/', users.findAll);

  router.post('/', users.create);

  app.use('/api/user', router);
};
