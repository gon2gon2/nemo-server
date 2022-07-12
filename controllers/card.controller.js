// import db from '../models/index.js';
// const {User} = db;
const Controller = {};

// Create and Save a new user
Controller.create = (req, res) => {
  res.status(201).send({
    message: "이미지 저장 성공",
    fileInfo: req.file,
    body: req.body
  })
};

export default Controller;
