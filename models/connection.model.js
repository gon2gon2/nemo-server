import { DataTypes } from "sequelize/types";

export default (sequelize, Sequelize) => {
  const Connection = sequelize.define('connection', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id_1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id_2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    connection_date: {
      type: Sequelize.DATETIME,
      defaultValue: DataTypes.NOW
    }
  });
  return Connection;
};
