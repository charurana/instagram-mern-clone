const express = require('express');
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const postStorage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, path.resolve(__dirname, '../../public/uploads/posts'));
   },
   filename: function (req, file, cb) {
       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
   }
});

const postUpload = multer({
   storage: postStorage,
   limits: { fileSize: 1000000 * 50 }
});

router.post("/post/new", isAuthenticated, postUpload.single('post'), postController.newPost);

router.get("/posts/all", postController.allPosts);
router.get("/posts", isAuthenticated, postController.getPostsOfFollowing);
router.get("/reels", isAuthenticated, postController.getReels);

router.get("/post/detail/:id", isAuthenticated, postController.getPostDetails);

router.route("/post/:id")
   .get(isAuthenticated, postController.likeUnlikePost)
   .post(isAuthenticated, postController.saveUnsavePost)
   .put(isAuthenticated, postController.updateCaption)
   .delete(isAuthenticated, postController.deletePost);

router.post("/post/comment/:id", isAuthenticated, postController.newComment);

module.exports = router;
