import Testimonial from "../models/Testimonial.js";
import fs from "fs";
import path from "path";

/* ===============================
   GET ACTIVE TESTIMONIALS (PUBLIC)
================================ */
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find({ active: true }).sort({
      createdAt: -1,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

/* ===============================
   CREATE TESTIMONIAL (ADMIN)
================================ */
export const createTestimonial = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    let image;
    let folder = "testimonials"; // ✅ SAFE HERE

    if (req.file) {
      image = `${baseUrl}/uploads/${folder}/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const testimonial = await Testimonial.create({
      name: req.body.name,
      role: req.body.role,
      image,
      content: req.body.content,
      rating: req.body.rating || 5,
      tag: req.body.tag,
      active: true,
    });

    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
};


/* ===============================
   DELETE TESTIMONIAL (ADMIN)
================================ */
export const deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // delete image from disk if uploaded
    if (item.image.includes("/uploads/testimonials")) {
      const filePath = path.join(
        process.cwd(),
        item.image.replace(`${req.protocol}://${req.get("host")}/`, "")
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await item.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};
