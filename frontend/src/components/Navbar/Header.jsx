import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { exploreOutline, homeFill, homeOutline, likeOutline, messageFill, messageOutline, postUploadOutline, reelsIcon } from './SvgIcons'
import { Link, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import NewPost from './NewPost';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import { BASE_PROFILE_IMAGE_URL } from '../../utils/constants';
import SearchBox from './SearchBar/SearchBox';

const Header = () => {
   const { user } = useSelector((state) => state.user);

   const [profileToggle, setProfileToggle] = useState(false);
   const [newPost, setNewPost] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
   const [unreadCount, setUnreadCount] = useState(0);

   const location = useLocation();
   const [onHome, setOnHome] = useState(false);
   const [onChat, setOnChat] = useState(false);
   const [onReels, setOnReels] = useState(false);

   const fetchNotifications = async () => {
       try {
           const { data } = await axios.get('/api/v1/notifications');
           const unread = (data.notifications || []).filter((n) => !n.isRead).length;
           setUnreadCount(unread);
       } catch (error) {
           console.log(error);
       }
   };

   useEffect(() => {
       setOnHome(location.pathname === "/");
       setOnChat(location.pathname.split('/').includes("direct"));
       setOnReels(location.pathname === "/watch/reels");
   }, [location]);

   useEffect(() => {
       fetchNotifications();
   }, [location.pathname, showNotifications]);

   const handleNotificationsToggle = () => {
       setShowNotifications(!showNotifications);
       setProfileToggle(false);
   };

   const handleProfileToggle = () => {
       setProfileToggle(!profileToggle);
       setShowNotifications(false);
   };

   return (
       <nav className="fixed top-0 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md z-10">
           <div className="flex justify-between items-center px-4 py-3 xl:w-4/6 mx-auto relative">

               <Link to="/">
                   <img
                       draggable="false"
                       className="h-9 object-contain"
                       src="/logo.png"
                       alt="Instagram"
                   />
               </Link>

               <SearchBox />

               <div className="flex items-center space-x-6">
                   <Link to="/" className="transition-transform hover:scale-110">
                       {profileToggle || !onHome ? homeOutline : homeFill}
                   </Link>

                   <Link to="/direct/inbox" className="transition-transform hover:scale-110">
                       {onChat ? messageFill : messageOutline}
                   </Link>

                   <Link to="/watch/reels" className="transition-transform hover:scale-110">
                       {reelsIcon}
                   </Link>

                   <div
                       onClick={() => setNewPost(true)}
                       className="cursor-pointer transition-transform hover:scale-110"
                   >
                       {postUploadOutline}
                   </div>

                   <span className="hidden sm:block transition-transform hover:scale-110">{exploreOutline}</span>

                   <button
                       type="button"
                       onClick={handleNotificationsToggle}
                       className="hidden sm:block relative transition-transform hover:scale-110 bg-transparent border-0 p-0"
                   >
                       {likeOutline}
                       {unreadCount > 0 && (
                           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                               {unreadCount > 9 ? "9+" : unreadCount}
                           </span>
                       )}
                   </button>

                   <div
                       onClick={handleProfileToggle}
                       className={`rounded-full cursor-pointer h-8 w-8 p-[1px] ${
                           profileToggle || (!onHome && !onChat && !onReels)
                               ? 'border border-black'
                               : ''
                       }`}
                   >
                       <img
                           draggable="false"
                           loading="lazy"
                           className="w-full h-full rounded-full object-cover"
                           src={BASE_PROFILE_IMAGE_URL + user.avatar}
                           alt=""
                       />
                   </div>
               </div>

               {showNotifications && (
                   <Notifications onClose={() => setShowNotifications(false)} />
               )}

               {profileToggle && (
                   <ProfileDetails setProfileToggle={setProfileToggle} />
               )}

               <NewPost newPost={newPost} setNewPost={setNewPost} />
           </div>
       </nav>
   )
}

export default Header;
