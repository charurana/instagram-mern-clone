const APP_ORIGIN =
   process.env.NODE_ENV === "production"
       ? window.location.origin
       : "http://localhost:4000";

// ✅ images/posts/profile ke liye
export const BASE_PROFILE_IMAGE_URL = `${APP_ORIGIN}/uploads/profiles/`;
export const BASE_POST_IMAGE_URL = `${APP_ORIGIN}/uploads/posts/`;

// ✅ socket endpoint
export const SOCKET_ENDPOINT =
   process.env.NODE_ENV === "production"
       ? window.location.origin
       : "http://localhost:4000";

// stories dummy data
export const stories = [
   { title: "JavaScript", image: "javascript" },
   { title: "Node.js", image: "node" },
   { title: "Express.js", image: "express" },
   { title: "MongoDB", image: "mongodb" },
   { title: "React.js", image: "react" },
];
