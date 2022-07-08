const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize({
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  database: dbConfig.DATABASE,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 우리가 정의한 모델들(테이블)
db.User = require('./user.model')(sequelize, Sequelize);
db.Card = require('./card.model')(sequelize, Sequelize);
db.Tag = require('./tag.model')(sequelize, Sequelize);

module.exports = db; // exports인데 export로 써서 에러남 ㅋㅋ
