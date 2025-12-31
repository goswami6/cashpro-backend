import Settings from "../models/Settings.js";

/* GET SOCIAL LINKS */
export const getSocialLinks = async (req, res) => {
  const settings = await Settings.findOne({ key: "social_links" });
  res.json(settings?.socialLinks || {});
};

/* UPDATE SOCIAL LINKS (ADMIN) */
export const updateSocialLinks = async (req, res) => {
  const updated = await Settings.findOneAndUpdate(
    { key: "social_links" },
    {
      key: "social_links",
      socialLinks: req.body,
    },
    { upsert: true, new: true }
  );

  res.json(updated.socialLinks);
};
