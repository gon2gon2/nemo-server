import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';

// 우리가 정의한 모델들(테이블)
import User from './user.model.js';
import Card from './card.model.js';
import Connection from './connection.model.js';
import Chatroom from './chatroom.model.js';
import Chatmessage from './chatmessage.model.js';

const sqlLog = process.env.NODE_ENV !== 'test';

const sequelize = new Sequelize({
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  database: dbConfig.DATABASE,
  timezone: '+09:00',
  logging: sqlLog,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User(sequelize, Sequelize);
db.Card = Card(sequelize, Sequelize);
db.Connection = Connection(sequelize, Sequelize);
db.Chatroom = Chatroom(sequelize, Sequelize);
db.Chatmessage = Chatmessage(sequelize, Sequelize);

export default db;
