const Notification = require("../models/notificationModel");
const catchAsync = require("../middlewares/catchAsync");

exports.getNotifications = catchAsync(async (req, res, next) => {
   const notifications = await Notification.find({
       receiver: req.user._id,
   })
       .populate("sender", "username avatar name")
       .populate("post")
       .sort({ createdAt: -1 });

   res.status(200).json({
       success: true,
       notifications,
   });
});

exports.markNotificationsRead = catchAsync(async (req, res, next) => {
   await Notification.updateMany(
       { receiver: req.user._id, isRead: false },
       { $set: { isRead: true } }
   );

   res.status(200).json({
       success: true,
       message: "Notifications marked as read",
   });
});
