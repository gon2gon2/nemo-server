import db from '../models/index.js';

const { Report } = db;
const Controller = {};

// Create and Save a new user
Controller.create = async data => {
  const { reporter_id, reportee_id, title, detail } = data;

  const exist = await Report.findOne({ where: { reporter_id, reportee_id } });
  if (exist) {
    return 2; // 중복 신고 X
  }

  const newReport = await Report.create({
    reporter_id,
    reportee_id,
    title,
    detail,
  });

  if (!newReport) {
    return 0;
  }
  return 1;
};

export default Controller;
