export default (sequelize, Sequelize) => {
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
    tag_1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_3: {
      type: Sequelize.STRING,
      allowNull: false,
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
