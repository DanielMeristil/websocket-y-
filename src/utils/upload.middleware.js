import multer from "multer";

const storage = multer.diskStorage({
    destination: "public./data/imagen",
    filename: (req, File, cb) => {
        const uniqueSuffix = Date.now() + '-' + math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "png");
    }
});
const upload = multer({ storage });
export default upload;