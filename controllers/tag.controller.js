import db from '../models/index.js';

const Controller = {};
const { Tag } = db;


// 새 태그 생성하여 return
Controller.create = async (tag_name) => {
  const new_tag = await Tag.create({tag_name});
  if (!new_tag) {
    return false;
  }
  const tag_id = new_tag.id;
  return tag_id;
  // return new_tag;
}
// 태그명 -> 태그아이디
Controller.findWithName = async (tag_name) => {
  const founded_tag = await Tag.findOne({where: {"tag_name": tag_name}}) 
  if (!founded_tag){
    return false
  }
  return founded_tag;
}

// 태그아이디 -> 태그명
Controller.findWithId = async (tag_id) => {
  const founded_tag = await Tag.findOne({where: {"id": tag_id}}) 
  if (!founded_tag){
    return false
  }
  return founded_tag;
}

export default Controller;
