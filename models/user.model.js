export default (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    friends: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    account_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tag_img_url_1: {
      type: Sequelize.STRING,
    },
    tag_img_url_2: {
      type: Sequelize.STRING,
    },
    tag_img_url_3: {
      type: Sequelize.STRING,
    },
    detail_title: {
      type: Sequelize.STRING,
    },
    detail_content: {
      type: Sequelize.TEXT,
    }
  });
  return User;
};
