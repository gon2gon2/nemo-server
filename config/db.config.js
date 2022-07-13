import 'dotenv/config'

export default {
    USER: process.env.MYSQL_USERNAME,
    PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    DATABASE: process.env.MYSQL_DATABASE,
    DIALECT: 'mysql',
  };