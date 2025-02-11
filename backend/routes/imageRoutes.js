import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/compare", upload.fields([{ name: "masterImages" }, { name: "userImage" }]), async (req, res) => {
    try {
        const formData = new FormData();
        
        // Append master images
        req.files["masterImages"].forEach((file) => {
            formData.append("master_files", fs.createReadStream(file.path), file.originalname);
        });

        // Append user image
        formData.append("user_file", fs.createReadStream(req.files["userImage"][0].path), req.files["userImage"][0].originalname);

        // Send request to FastAPI
        const response = await axios.post("http://127.0.0.1:8000/process-image/", formData, {
            headers: { ...formData.getHeaders() },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
    console.log(req.files);

});

export default router;  // ✅ Fix: Use `export default` for ESM
