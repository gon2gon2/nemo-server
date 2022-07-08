const db = require('../models');

const {User} = db;
// const {Op} = db.Sequelize;

exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data);
  });
};

exports.create = (req, res) => {
  const user = {
    friends: '2,3,4,5,',
    account_name: '정글러버',
    password: '1likejungle!',
    phone_number: '010-2222-4333',
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'some error',
      });
    });
};
