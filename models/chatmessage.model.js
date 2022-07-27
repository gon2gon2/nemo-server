export default (sequelize, Sequelize) => {
  const Chatmessage = sequelize.define('chatmessage', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatroom_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sender: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    messagetext: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sendat: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  return Chatmessage;
};
