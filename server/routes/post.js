import express from 'express'
import { fetchPosts, fetchPostById, createPost, updatePost, deletePost } from '../controllers/post.js'
import multer from 'multer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, path.join(__dirname, "../../client/public/uploads"))
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname +  "_" + Date.now() + "_" + file.originalname)
    }
})

let fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
        cb(null, true);
    }
    else{
        cb(null, false)
    }
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const router = express.Router()
router.get("/", fetchPosts)
router.get("/fetch/", fetchPostById)
router.post("/create", upload.single("image"), createPost)
router.put("/update/", updatePost);
router.delete("/delete/:id", deletePost)

export default router;