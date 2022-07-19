import db from '../models/index.js';

const {Card} = db;
const Controller = {};

// Create and Save a new user
Controller.create = async (data) => {
  const {user_id, nickname, tag_id_1, tag_id_2, tag_id_3, intro, img_url} = data;
  const new_card = await Card.create({user_id, nickname, tag_id_1, tag_id_2, tag_id_3, intro, img_url});
  if (!new_card){
    return false;
  }
  return true;
};


Controller.findWithUserId = async (user_id) => {
  const foundedCard = await Card.findOne({where: {user_id}});
  if (!foundedCard){
    return false;
  }
  return foundedCard;
}

Controller.findCards = async (ids) => {
  const allCards = await Card.findAll({where: {'user_id': ids}})
  return allCards;
}

export default Controller;
