// import 'dotenv/config'
import * as dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV;

const test = {
    USER: process.env.TEST_USERNAME,
    PASSWORD: process.env.TEST_ROOT_PASSWORD,
    HOST: process.env.TEST_HOST,
    PORT: process.env.TEST_PORT,
    DATABASE: process.env.TEST_DATABASE,
    DIALECT: 'mysql',
}

const development =  {
    USER: process.env.DEV_USERNAME,
    PASSWORD: process.env.DEV_ROOT_PASSWORD,
    HOST: process.env.DEV_HOST,
    PORT: process.env.DEV_PORT,
    DATABASE: process.env.DEV_DATABASE,
    DIALECT: 'mysql',
  };

const production =  {
    USER: process.env.MYSQL_USERNAME,
    PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    DATABASE: process.env.MYSQL_DATABASE,
    DIALECT: 'mysql',
  };

const config = {
  test,
  production,
  development
}

export default config[env];
