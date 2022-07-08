module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tag_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Tag;
};
