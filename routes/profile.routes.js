/*  프로필을 위한 라우터입니다. 
    라우터는 컨트롤러에 값을 넘겨주기만 합니다. */

const router = require('express').Router();
const profiles = require('../controllers/profile.controller');

module.exports = app => {

  router.get('/', profiles.create);

  app.use('/api/profile', router);
};
