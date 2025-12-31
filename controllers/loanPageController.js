import LoanPage from "../models/LoanPage.js";

export const getLoanPage = async (req, res) => {
  const { type } = req.params;
  const page = await LoanPage.findOne({ type });
  res.json(page);
};

export const upsertLoanPage = async (req, res) => {
  const { type } = req.body;

  let page = await LoanPage.findOne({ type });

  if (page) {
    page = await LoanPage.findByIdAndUpdate(page._id, req.body, { new: true });
  } else {
    page = await LoanPage.create(req.body);
  }

  res.json(page);
};
