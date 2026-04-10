import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_POST_IMAGE_URL } from "../../../utils/constants";

const PostContainer = ({ posts = [], id }) => {
   const navigate = useNavigate();
   const [selectedPost, setSelectedPost] = useState(null);

   const isVideoPost = (post) => {
       const file = post?.image?.toLowerCase() || "";
       return (
           file.endsWith(".mp4") ||
           file.endsWith(".webm") ||
           file.endsWith(".ogg") ||
           post?.mediaType === "video"
       );
   };

   const handleOpen = (post) => {
       if (isVideoPost(post)) {
           navigate("/reels");
           return;
       }
       setSelectedPost(post);
   };

   const closeModal = () => {
       setSelectedPost(null);
   };

   return (
       <>
           <div className="grid grid-cols-3 gap-1 sm:gap-7 mt-6 mb-10">
               {posts?.map((post) => (
                   <div
                       key={post._id}
                       onClick={() => handleOpen(post)}
                       className="relative aspect-square overflow-hidden cursor-pointer bg-gray-100"
                   >
                       {isVideoPost(post) ? (
                           <>
                               <video
                                   src={BASE_POST_IMAGE_URL + post.image}
                                   className="w-full h-full object-cover"
                                   muted
                                   autoPlay
                                   loop
                                   playsInline
                               />
                               <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full">
                                   Reel
                               </div>
                           </>
                       ) : (
                           <img
                               src={BASE_POST_IMAGE_URL + post.image}
                               className="w-full h-full object-cover"
                               alt="post"
                               draggable="false"
                           />
                       )}
                   </div>
               ))}
           </div>

           {selectedPost && (
               <div
                   className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4"
                   onClick={closeModal}
               >
                   <div
                       className="bg-white w-full max-w-4xl h-[85vh] rounded overflow-hidden flex"
                       onClick={(e) => e.stopPropagation()}
                   >
                       <div className="w-1/2 bg-black flex items-center justify-center">
                           <img
                               src={BASE_POST_IMAGE_URL + selectedPost.image}
                               alt="post"
                               className="w-full h-full object-contain"
                               draggable="false"
                           />
                       </div>

                       <div className="w-1/2 bg-white flex flex-col">
                           <div className="flex items-center justify-between border-b px-4 py-3">
                               <span className="font-semibold">{selectedPost?.postedBy?.username || "Post"}</span>
                               <button onClick={closeModal} className="text-xl leading-none">×</button>
                           </div>

                           <div className="p-4 overflow-y-auto">
                               <p className="text-sm">
                                   <span className="font-semibold mr-2">
                                       {selectedPost?.postedBy?.username || ""}
                                   </span>
                                   {selectedPost?.caption || ""}
                               </p>
                           </div>
                       </div>
                   </div>
               </div>
           )}
       </>
   );
};

export default PostContainer;