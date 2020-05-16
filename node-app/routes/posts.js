const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const multerInfo = require('../middleware/multer-info');
const postController = require('../controllers/post-controller');

router.get("", postController.getPost);

router.get("/:id", postController.getPostById);

router.post("", checkAuth, multerInfo, postController.createPost);

router.delete("/:id", checkAuth, postController.deletePost);

router.put("/:id", checkAuth, multerInfo, postController.updatePost);

module.exports = router;
