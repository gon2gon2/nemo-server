export default (sequelize, Sequelize) => {
  const Connection = sequelize.define('report', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reporter_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reportee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Connection;
};
