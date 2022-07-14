import db from '../models/index.js';

const Controller = {};
const { Tag } = db;

// user_id로 모든 친구들 다 찾아서 리턴
Controller.findAllFriends  = (user_id) => {

}


// 나랑 얘랑 친구인지 확인
Controller.isFriend = (user_id_1, user_id_2) => {

}


// 나랑 친구인지 확인하고 아니면 추가
Controller.create = (user_id_1, user_id_2) => {
    //
}