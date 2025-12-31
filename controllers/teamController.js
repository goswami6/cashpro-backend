import TeamMember from "../models/TeamMember.js";

/* ===============================
   GET ACTIVE TEAM (PUBLIC)
================================ */
export const getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find({ active: true }).sort({
      createdAt: 1,
    });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team" });
  }
};

/* ===============================
   CREATE TEAM MEMBER (ADMIN)
================================ */
export const createTeamMember = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    let image;
    if (req.file) {
      image = `${baseUrl}/uploads/team/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const member = await TeamMember.create({
      name: req.body.name,
      role: req.body.role,
      bio: req.body.bio,
      image,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      email: req.body.email,
      active: true,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create team member" });
  }
};

/* ===============================
   DELETE TEAM MEMBER (ADMIN)
================================ */
export const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete team member" });
  }
};
