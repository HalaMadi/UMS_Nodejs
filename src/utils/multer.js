import multer from "multer";

const uploadFile = () => {
    const storage = multer.diskStorage({});

    const filterFile = (req, file, cb) => {

        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true)
        } else {
            cb('Invalid format')
        }
    }
    const upload = multer({ filterFile, storage });
    return upload;
}
export default uploadFile