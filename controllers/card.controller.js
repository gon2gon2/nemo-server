import db from '../models/index.js';

const {Card} = db;
const Controller = {};

// Create and Save a new user
Controller.create = (data) => {
  const {user_id, nickname, tag_id_1, tag_id_2, tag_id_3, intro, img_url} = data;
  const new_card = Card.create({user_id, nickname, tag_id_1, tag_id_2, tag_id_3, intro, img_url});
  if (!new_card){
    return false;
  }
  return true;
};

export default Controller;
