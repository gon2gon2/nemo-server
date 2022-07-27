export default (sequelize, Sequelize) => {
  const Connection = sequelize.define('connection', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id_1: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id_2: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_ids: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    connection_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    lng: {
      type: Sequelize.DECIMAL(11, 5),
      allowNull: false,
    },
    lat: {
      type: Sequelize.DECIMAL(11, 5),
      allowNull: false,
    },
    not_read_cnt: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
  return Connection;
};
