import PersonalLoan from "../models/PersonalLoan.js";

/* ===========================
   GET PERSONAL LOAN DATA
=========================== */
export const getPersonalLoan = async (req, res) => {
  try {
    const data = await PersonalLoan.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ===========================
   UPDATE / CREATE (ADMIN)
=========================== */
export const upsertPersonalLoan = async (req, res) => {
  try {
    let data = await PersonalLoan.findOne();

    if (data) {
      data = await PersonalLoan.findByIdAndUpdate(
        data._id,
        req.body,
        { new: true }
      );
    } else {
      data = await PersonalLoan.create(req.body);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
