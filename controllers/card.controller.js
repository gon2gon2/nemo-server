import db from '../models/index.js';

const { Card } = db;
const Controller = {};

// Create and Save a new user
Controller.create = async data => {
  const {
    user_id,
    nickname,
    tag_1,
    tag_2,
    tag_3,
    intro,
    image,
    tag_img_1,
    tag_img_2,
    tag_img_3,
    detail_title,
    detail_content,
  } = data;

  const exist = await Card.findOne({ where: { user_id } });
  if (exist) {
    return false;
  }

  const new_card = await Card.create({
    user_id,
    nickname,
    tag_1,
    tag_2,
    tag_3,
    intro,
    image,
    tag_img_1,
    tag_img_2,
    tag_img_3,
    detail_title,
    detail_content,
  });

  if (!new_card) {
    return false;
  }
  return true;
};

Controller.findWithUserId = async user_id => {
  const foundedCard = await Card.findOne({ where: { user_id } });
  if (!foundedCard) {
    return false;
  }
  return foundedCard;
};

Controller.findCards = async (ids, offset) => {
  const allCards = await Card.findAll({ where: { user_id: ids } , limit: 5, offset}); 
  return allCards;
};

Controller.updateCard = async data => {
  const { user_id } = data;
  const updatedCard = await Card.update(data, {
    where: { user_id },
  });
  return updatedCard;
};

export default Controller;
