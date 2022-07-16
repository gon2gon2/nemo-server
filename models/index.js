import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';

// 우리가 정의한 모델들(테이블)
import User from './user.model.js'
import Card from './card.model.js'
import Tag from './tag.model.js'
import Connection from './connection.model.js'

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
db.User = User(sequelize, Sequelize);
db.Card = Card(sequelize, Sequelize);
db.Tag = Tag(sequelize, Sequelize);
db.Connection = Connection(sequelize, Sequelize);

export default db;
