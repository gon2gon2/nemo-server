import db from '../models/index.js';

const {User} = db;
const Controller = {};
// const {Op} = db.Sequelize;

Controller.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  });
};

Controller.create = (req, res) => {
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
export default Controller;