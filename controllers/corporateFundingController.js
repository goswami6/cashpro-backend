import CorporateFunding from "../models/CorporateFunding.js";

/* GET DATA */
export const getCorporateFunding = async (req, res) => {
  const data = await CorporateFunding.findOne();
  res.json(data);
};

/* CREATE / UPDATE */
export const upsertCorporateFunding = async (req, res) => {
  let data = await CorporateFunding.findOne();

  if (data) {
    data = await CorporateFunding.findByIdAndUpdate(data._id, req.body, {
      new: true,
    });
  } else {
    data = await CorporateFunding.create(req.body);
  }

  res.json(data);
};
