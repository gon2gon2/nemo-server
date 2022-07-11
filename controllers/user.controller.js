import db from '../models/index.js';

const {User} = db;
const Controller = {};
// const {Op} = db.Sequelize;

Controller.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  });
};

Controller.signup = (req, res) => {
  const {body} = req;
  const user = {
    friends: "",
    account_name: body.account_name,
    password: body.password,
    phone_number: body.phone_number,
  }
  User.create(user)
    .then(() => {
      res.status(201).send({
        result : "success"
      });
    })
    .catch(() => {
      res.status(500).send({
        result: "fail"
        // message: err.message || 'some error',
      });
    });
};

Controller.login = (req, res) => {

  const {account_name, password} = req.body;
  // console.log("계정", account_name);
  // console.log("비번", password);
  User.findAll({
    where: {
      account_name
    }
  }
  ).then((data) => {
    if (!data.length) {
      res.status(404).send({
        result: "Not found",
        message: "ID가 잘못되었습니다."
      })
    }
    else if (data[0].password !== password){
      res.status(401).send({
        result: "wrong password",
        message: "pw가 잘못되었습니다."
      })
    }
    else {
      // int는 못 보낸다 -> object로 바꿔서 전송
      res.status(200).send({
        result: "success",
        user_id: data[0].id
      });
    }
  })
  .catch(()=> {
    res.status(404).send({
      result:"fail"
    })
  })
}

export default Controller;