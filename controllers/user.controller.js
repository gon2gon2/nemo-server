import db from '../models/index.js';

const {User} = db;
const Controller = {};
// const {Op} = db.Sequelize;


Controller.create = (data) => {
  const { account_name, password, phone_number } = data;
  // 중복 생성 안 되게 하는 로직 추가 필요
  const friends = "";
  const new_user = User.create({friends, account_name, password, phone_number});
  if (!new_user) {
    return false;
  }
  return new_user.id
}

Controller.findWithAccountName = (account_name) => {
  const founded_user = User.findOne({where: {account_name}});
  if (!founded_user){
    return false;
  }
  return founded_user;
}

export default Controller;