import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_PROFILE_IMAGE_URL, BASE_POST_IMAGE_URL } from '../../utils/constants';

const Notifications = ({ onClose }) => {
   const [notifications, setNotifications] = useState([]);

   const fetchNotifications = async () => {
       try {
           const { data } = await axios.get('/api/v1/notifications');
           setNotifications(data.notifications || []);
       } catch (error) {
           console.log(error);
       }
   };

   const markAsRead = async () => {
       try {
           await axios.put('/api/v1/notifications/read');
       } catch (error) {
           console.log(error);
       }
   };

   useEffect(() => {
       fetchNotifications();
       markAsRead();
   }, []);

   return (
       <div className="absolute w-96 bg-white rounded-md drop-shadow-xl right-20 top-14 border z-50">
           <div className="absolute right-6 -top-2 rotate-45 h-4 w-4 bg-white border-l border-t"></div>

           <div className="p-3 border-b">
               <h3 className="font-semibold text-sm">Notifications</h3>
           </div>

           <div className="flex flex-col w-full max-h-96 overflow-y-auto">
               {notifications.length === 0 ? (
                   <div className="p-4 text-sm text-gray-500">No notifications yet</div>
               ) : (
                   notifications.map((notification) => (
                       <div
                           key={notification._id}
                           className="flex items-center justify-between gap-3 p-3 text-sm hover:bg-gray-50"
                       >
                           <div className="flex items-center gap-3">
                               <img
                                   src={BASE_PROFILE_IMAGE_URL + notification.sender?.avatar}
                                   alt="avatar"
                                   className="w-10 h-10 rounded-full object-cover"
                               />

                               <div className="flex flex-col">
                                   <span className="text-sm text-gray-800">
                                       <Link
                                           to={`/${notification.sender?.username}`}
                                           onClick={onClose}
                                           className="font-semibold"
                                       >
                                           {notification.sender?.username}
                                       </Link>{" "}
                                       {notification.type === "like" && "liked your post"}
                                       {notification.type === "comment" && (
                                           <>commented: {notification.text}</>
                                       )}
                                       {notification.type === "follow" && notification.text}
                                   </span>

                                   <span className="text-xs text-gray-400">
                                       {new Date(notification.createdAt).toLocaleString()}
                                   </span>
                               </div>
                           </div>

                           {notification.post?.image && (
                               <img
                                   src={BASE_POST_IMAGE_URL + notification.post.image}
                                   alt="post"
                                   className="w-12 h-12 object-cover rounded"
                               />
                           )}
                       </div>
                   ))
               )}
           </div>
       </div>
   );
};

export default Notifications;
