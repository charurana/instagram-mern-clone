const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const avatarStorage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, path.resolve(__dirname, '../../public/uploads/profiles'))
   },
   filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
   }
});

const avatarUpload = multer({
   storage: avatarStorage,
   limits: { fileSize: 1000000 * 2 }
});

router.post("/signup", avatarUpload.single('avatar'), userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

router.route("/me")
   .get(isAuthenticated, userController.getAccountDetails)
   .delete(isAuthenticated, userController.deleteProfile);

router.get("/user/:username", isAuthenticated, userController.getUserDetails);
router.get("/userdetails/:id", isAuthenticated, userController.getUserDetailsById);

router.get("/users/suggested", isAuthenticated, userController.getAllUsers);
router.get("/users", isAuthenticated, userController.searchUsers);

router.get("/follow/:id", isAuthenticated, userController.followUser);

router.get("/notifications", isAuthenticated, userController.getNotifications);
router.put("/notifications/read", isAuthenticated, userController.markNotificationsRead);

router.put("/update/profile", isAuthenticated, avatarUpload.single('avatar'), userController.updateProfile);
router.put("/update/password", isAuthenticated, userController.updatePassword);

router.post('/password/forgot', userController.forgotPassword);
router.put('/password/reset/:token', userController.resetPassword);

module.exports = router;
