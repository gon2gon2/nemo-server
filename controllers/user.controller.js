import db from '../models/index.js';

const {User, Card, Tag} = db;
const Controller = {};
const {Op} = db.Sequelize;


Controller.create = async (data) => {
  const { account_name, password, phone_number } = data;
  // 중복 생성 안 되게 하는 로직 추가 필요
  const friends = "";
  const new_user = await User.create({friends, account_name, password, phone_number});
  if (!new_user) {
    return false;
  }
  return new_user.id
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
    const {nickname, img_url, user_id, intro, tag_id_1, tag_id_2, tag_id_3 } = allCards[i];
    const tagObj_1 = await Tag.findOne({where: {id: tag_id_1}})
    const tagObj_2 = await Tag.findOne({where: {id: tag_id_2}})
    const tagObj_3 = await Tag.findOne({where: {id: tag_id_3}})


    const tag_1 = tagObj_1.tag_name;
    const tag_2 = tagObj_2.tag_name;
    const tag_3 = tagObj_3.tag_name;

    // console.log({tag_id_1, tag_id_2, tag_id_3 });
    const converted = {
      nickname,
      img_url, 
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

export default Controller;