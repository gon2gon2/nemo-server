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
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_img_1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_img_2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_img_3: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail_content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Card;
};
