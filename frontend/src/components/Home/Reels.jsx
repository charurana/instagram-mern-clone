import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_POST_IMAGE_URL, BASE_PROFILE_IMAGE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const Reels = () => {
   const [reels, setReels] = useState([]);

   const fetchReels = async () => {
       try {
           const { data } = await axios.get("/api/v1/reels");
           setReels(data.reels || []);
       } catch (error) {
           console.log(error);
       }
   };

   useEffect(() => {
       fetchReels();
   }, []);

   return (
       <div className="bg-black min-h-screen pt-16">
           <div className="h-[calc(100vh-64px)] overflow-y-auto snap-y snap-mandatory">
               {reels.length === 0 ? (
                   <div className="h-full flex items-center justify-center text-white text-lg">
                       No reels yet
                   </div>
               ) : (
                   reels.map((reel) => (
                       <div
                           key={reel._id}
                           className="h-[calc(100vh-64px)] snap-start relative flex items-center justify-center bg-black"
                       >
                           <video
                               src={BASE_POST_IMAGE_URL + reel.image}
                               className="max-h-full max-w-full w-auto object-contain"
                               autoPlay
                               loop
                               muted
                               controls
                               playsInline
                               preload="metadata"
                           />

                           <div className="absolute bottom-8 left-5 text-white max-w-[320px] z-10">
                               <div className="flex items-center gap-3 mb-2">
                                   <img
                                       src={BASE_PROFILE_IMAGE_URL + reel.postedBy?.avatar}
                                       className="w-10 h-10 rounded-full object-cover"
                                       alt="avatar"
                                   />
                                   <Link to={`/${reel.postedBy?.username}`} className="font-semibold">
                                       {reel.postedBy?.username}
                                   </Link>
                               </div>

                               <p className="text-sm break-words">{reel.caption}</p>
                           </div>
                       </div>
                   ))
               )}
           </div>
       </div>
   );
};

export default Reels;
