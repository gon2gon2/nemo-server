module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define('card', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tag_id_1: {
      type: Sequelize.INTEGER,
    },
    tag_id_2: {
      type: Sequelize.INTEGER,
    },
    tag_id_3: {
      type: Sequelize.INTEGER,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    intro: {
      type: Sequelize.STRING,
    },
    img_url: {
      type: Sequelize.STRING,
    },
  });
  return Card;
};
