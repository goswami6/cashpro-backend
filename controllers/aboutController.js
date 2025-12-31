import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({}); 
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};