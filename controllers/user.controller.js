import db from '../models/index.js';

const {User, Card, Tag} = db;
const Controller = {};
const {Op} = db.Sequelize;


Controller.create = async (data) => {
  const { account_name, password, phone_number } = data;

  if (!account_name || !password || !phone_number) {
    return [false, "누락된 정보가 있습니다"];
  }
  
  // 중복 생성 체크
  const exist = await User.findOne({where: {account_name}});
  if (exist){
    return [false, "이미 존재하는 아이디입니다"];
  }

  const new_user = await User.create({
    account_name,
    password,
    phone_number,
  });
  if (!new_user) {
    return [false, "생성에 실패했습니다. 다시 시도해주세요"];
  }
  // return new_user.dataValues.id;
  return [true, new_user.dataValues.id];
}

Controller.findWithAccountName = async (account_name) => {
  const founded_user = await User.findOne({where: {account_name}});
  if (!founded_user){
    return false;
  }
  return founded_user;
}

Controller.findFriends = async (account_id) => {
  const founded_user = await User.findOne({where: {"id": account_id}});
  const friends = founded_user.friends.split(',');
  const allCards = await Card.findAll({
    where: {
      user_id : {[Op.in] : friends},
    }
  })

  const result = [];
  for (let i = 0; i < allCards.length; i += 1){
    const {nickname, image, user_id, intro, tag_id_1, tag_id_2, tag_id_3 } = allCards[i];
    const tagObj_1 = await Tag.findOne({where: {id: tag_id_1}})
    const tagObj_2 = await Tag.findOne({where: {id: tag_id_2}})
    const tagObj_3 = await Tag.findOne({where: {id: tag_id_3}})


    const tag_1 = tagObj_1.tag_name;
    const tag_2 = tagObj_2.tag_name;
    const tag_3 = tagObj_3.tag_name;

    // console.log({tag_id_1, tag_id_2, tag_id_3 });
    const converted = {
      nickname,
      image, 
      user_id,
      intro,
      tag_1,
      tag_2,
      tag_3
    }
    result.push(converted);
  }
  // founded_user.friends
  // .freinds로 card에서 하나씩 꺼내온다.
  return result;
}

Controller.updateUser = async (data) => {
  const { id } = data;

  const updatedUser = await User.update(
    data,
    {
      where: { id }
    }
    );
  return updatedUser
}

export default Controller;