import db from '../models/index.js';

const Controller = {};
const { Tag } = db;


// Create and Save a new user
Controller.create = (req, res) => {
  const { tag_name } = req.body;
  Tag.create({tag_name})
    .then(() => {
      res.status(201).send({
        "result":"success",
      })
    })
    .catch(()=>{
      res.status(404).send({
        "result":"success"
      })
    })

};

export default Controller;
