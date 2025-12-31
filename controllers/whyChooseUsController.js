import WhyChooseUs from "../models/WhyChooseUs.js";

/* PUBLIC */
export const getWhyChooseUs = async (req, res) => {
  const data = await WhyChooseUs.find({ active: true }).sort({ createdAt: 1 });
  res.json(data);
};

/* ADMIN */
export const createWhyChooseUs = async (req, res) => {
  const item = await WhyChooseUs.create(req.body);
  res.status(201).json(item);
};

export const deleteWhyChooseUs = async (req, res) => {
  await WhyChooseUs.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
