export default (sequelize, Sequelize) => {
  const Chatroom = sequelize.define('chatroom', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    connection_ids: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_ids: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_msg_time: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    last_msg_text: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  });
  return Chatroom;
};
