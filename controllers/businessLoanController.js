import BusinessLoan from "../models/BusinessLoan.js";

export const getBusinessLoan = async (req, res) => {
  const data = await BusinessLoan.findOne();
  res.json(data);
};

export const upsertBusinessLoan = async (req, res) => {
  let data = await BusinessLoan.findOne();

  if (data) {
    data = await BusinessLoan.findByIdAndUpdate(data._id, req.body, {
      new: true,
    });
  } else {
    data = await BusinessLoan.create(req.body);
  }

  res.json(data);
};
