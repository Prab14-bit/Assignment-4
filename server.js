const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// ========== GET IMAGE ==========
app.get("/api/getImage", (req, res) => {
    const name = req.query.name?.toLowerCase();
    const filePath = path.join(__dirname, "public", `${name}.jpg`);

    if (fs.existsSync(filePath)) {
        return res.json({ url: `/${name}.jpg` });
    }

    return res.json({ url: "/default.jpg" });
});

// ========== MULTER CONFIG ==========
const upload = multer({
    storage: multer.diskStorage({
        destination: "public/",
        filename: (req, file, cb) => {
            const name = req.query.name?.toLowerCase();
            cb(null, `${name}.jpg`);  // overwrite target file
        }
    })
});

// ========== UPLOAD ROUTE ==========
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.query.name) {
        return res.status(400).json({ msg: "Missing ?name= parameter" });
    }

    return res.json({ msg: "Upload successful" });
});

// ========== START SERVER ==========
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
