import path from "path";
import fs from "fs";
import File from "../Models/File.js";
import User from "../Models/User.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { originalname, path: savedPath } = req.file;
    const userId = req.body.userId; // ✅ consistent naming

    // Validate userId
    if (userId) {
      const userExists = await User.exists({ _id: userId });
      if (!userExists)
        return res.status(400).json({ message: "Invalid user ID" });
    } else {
      return res.status(400).json({ message: "userId is required" });
    }

    // Save file info
    const f = new File({
      fileName: originalname,
      filePath: savedPath,
      uploadedBy: userId,
    });

    await f.save();
    res.status(201).json({ message: "File uploaded successfully", file: f });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ message: err.message });
  }
};




export const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileDoc = await File.findById(fileId);
    if (!fileDoc) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(fileDoc.filePath);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing on disk" });

    res.setHeader("Content-Disposition", `attachment; filename="${fileDoc.fileName}"`);
    const readStream = fs.createReadStream(filePath);
    readStream.on("error", (err) => {
      console.error("stream error", err);
      res.status(500).end();
    });
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
