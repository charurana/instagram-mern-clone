import React from "react";
import PostItem from "./PostItem";
import { BASE_POST_IMAGE_URL } from "../../utils/constants";

const PostDetails = ({ post, onClose, setUsersDialog, setUsersList }) => {
 if (!post) return null;

 const imagePath =
   post.image && post.image.startsWith("http")
     ? post.image
     : `${BASE_POST_IMAGE_URL}${post.image}`;

 const modalPost = {
   ...post,
   image: imagePath,
 };

 return (
   <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
     <div className="relative bg-white w-full max-w-6xl max-h-[95vh] rounded-lg overflow-hidden">
       <button
         onClick={onClose}
         className="absolute top-3 right-4 z-50 text-xl font-semibold text-black"
       >
         ✕
       </button>

       <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] w-full h-full">
         <div className="bg-black flex items-center justify-center min-h-[300px]">
           <img
             src={imagePath}
             alt="post"
             className="w-full h-full max-h-[90vh] object-contain"
             draggable="false"
           />
         </div>

         <div className="overflow-y-auto bg-white">
           <PostItem
             {...modalPost}
             hideImage={true}
             setUsersDialog={setUsersDialog}
             setUsersList={setUsersList}
           />
         </div>
       </div>
     </div>
   </div>
 );
};

export default PostDetails;
