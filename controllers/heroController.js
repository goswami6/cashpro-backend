import HeroSlide from "../models/HeroSlide.js";
import fs from "fs";
import path from "path";

/* ===============================
   GET ACTIVE SLIDES (PUBLIC)
================================ */
export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({
      createdAt: -1,
    });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch slides" });
  }
};

/* ===============================
   CREATE SLIDE (ADMIN)
================================ */
export const createHeroSlide = async (req, res) => {
  try {
    let image;
    let type;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (req.file) {
      const folder = req.body.folder || "hero";
      image = `${baseUrl}/uploads/${folder}/${req.file.filename}`;
      type = "upload";
    } else if (req.body.image) {
      image = req.body.image;
      type = "url";
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const slide = await HeroSlide.create({
      image,
      type,
      active: true,
    });

    res.status(201).json(slide);
  } catch (error) {
    console.error("CREATE HERO ERROR:", error);
    res.status(500).json({
      message: "Hero slide creation failed",
      error: error.message,
    });
  }
};


/* ===============================
   DELETE SLIDE (ADMIN)
================================ */
export const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    /* ---------- DELETE FILE FROM DISK ---------- */
    if (slide.type === "upload") {
      // convert full URL → local file path
      const filePath = slide.image.replace(
        `${req.protocol}://${req.get("host")}/`,
        ""
      );

      const absolutePath = path.join(process.cwd(), filePath);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    await slide.deleteOne();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete slide" });
  }
};
