import db from '../models/index.js';

const { User } = db;
const Controller = {};

Controller.create = async data => {
  const { account_name, password, phone_number, salt } = data;

  if (!account_name || !password || !phone_number) {
    return [false, '누락된 정보가 있습니다'];
  }

  // 중복 생성 체크
  const exist = await User.findOne({ where: { account_name } });
  if (exist) {
    return [false, '이미 존재하는 아이디입니다'];
  }

  const new_user = await User.create({
    account_name,
    password,
    phone_number,
    salt,
  });
  if (!new_user) {
    return [false, '생성에 실패했습니다. 다시 시도해주세요'];
  }
  // return new_user.dataValues.id;
  return [true, new_user.dataValues.id];
};

Controller.findWithAccountName = async account_name => {
  const founded_user = await User.findOne({ where: { account_name } });
  if (!founded_user) {
    return false;
  }
  return founded_user;
};

Controller.updateUser = async data => {
  const { id } = data;

  const updatedUser = await User.update(data, {
    where: { id },
  });
  return updatedUser;
};

export default Controller;
