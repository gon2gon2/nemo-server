import db from '../models/index.js';

const Controller = {};
const { Connection, Sequelize } = db;

// Controller.findAllConnections = async user_id
Controller.resetreadCnt = async id => {
  console.log('here');
  const result = await db.sequelize.query(
    `UPDATE connections SET not_read_cnt = 0 WHERE id = ${id};`,
  );
  return result;
};

Controller.upreadCnt = async id => {
  const result = await Connection.increment(
    { not_read_cnt: 1 },
    { where: { id } },
  );
  return result;
};

Controller.getChatroomDatas = async (user_id, rooms) => {
  const result = await db.sequelize.query(
    `SELECT ca.user_id, ca.nickname, ca.intro, ca.image FROM cards AS ca JOIN connections as conn ON ca.user_id = conn.user_id_2 WHERE conn.user_id_1 = ${user_id} and conn.id in (${rooms})`,
  );
  return result;
};

Controller.getMarkers = async user_id => {
  const markers = await db.sequelize.query(
    `SELECT ca.nickname, ca.user_id, conn.lat, conn.lng, conn.connection_date FROM cards AS ca JOIN connections AS conn ON ca.user_id = conn.user_id_2 WHERE conn.user_id_1 = ${user_id}`,
  );
  return markers[0];
};

// 나-상대방, 상대방-나 의 connection id를 찾아줌
Controller.findAllConnectionsIds = async user_ids => {
  const connections = await Connection.findAll({ where: { user_ids } });
  const connection_ids = connections.map(item => item.dataValues.id);
  return connection_ids;
};

// id_1, id_2 순서의 connection id를 찾아줌 (친구-나의 커넥션 찾을 때 사용)
Controller.findConnectionId = async (user_id_1, user_id_2) => {
  const upId = await Connection.findOne({
    attributes: ['id'],
    where: { user_id_2: user_id_1, user_id_1: user_id_2 },
  });
  const downId = await Connection.findOne({
    attributes: ['id'],
    where: { user_id_1, user_id_2 },
  });
  console.log(user_id_1);

  console.log(user_id_2);

  console.log('why');
  const upConnId = upId.dataValues.id;
  const downConnId = downId.dataValues.id;
  // 여기서 not read cnt + 1해주기
  return [upConnId, downConnId];
};
/*     
    const getOppoId = await connections.findOpponentConnectionId(id_2, id_1);
    console.log('hi');
    console.log(getOppoId); 
*/

Controller.findAllFriends = async user_id => {
  const friends = await Connection.findAll({ where: { user_id_1: user_id } });
  console.log(friends);
  return friends;
};

Controller.findAllFriendsID = async user_id => {
  const friends = await Connection.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        'JSON_CONTAINS',
        Sequelize.col('user_ids'),
        Sequelize.literal(JSON.stringify(user_id)),
        Sequelize.literal(JSON.stringify('$')),
      ),
      1,
    ),
  });
  const ids = friends.map(item => item.dataValues.user_id_2);
  return ids;
};

// 친구들의 ID를 리턴
Controller.findAllFriendsId = async user_id => {
  const friends = await Connection.findAll({ where: { user_id_1: user_id } });
  const ids = friends.map(item => item.dataValues.user_id_2);
  return ids;
};

// 나랑 얘랑 친구인지 확인
Controller.isFriend = async (user_id_1, user_id_2) => {
  const result = await Connection.findAll({
    where: {
      user_id_1,
      user_id_2,
    },
  });
  if (!result.length) {
    return false;
  }
  return true;
};

// 친구추가
Controller.connect = async (user_id_1, user_id_2, user_ids, lat, lng) => {
  const result = await Connection.create({
    user_id_1,
    user_id_2,
    user_ids,
    lat,
    lng,
  });
  if (result) {
    return true;
  }
  return false;
};

// 친구 삭제
Controller.disconnect = async (user_id_1, user_id_2) => {
  const result = await Connection.destroy({ where: { user_id_1, user_id_2 } });
  return result;
};

// 테스트 코드용
Controller.getLength = async () => {
  const allConnection = await Connection.findAll();
  return allConnection.length;
};

Controller.getAllPos = async () => {
  const all = await Connection.findAll();
  return all;
};

export default Controller;
