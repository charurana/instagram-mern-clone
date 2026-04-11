const APP_ORIGIN =
   window.location.origin.includes("localhost")
       ? "http://localhost:4000"
       : window.location.origin;

export const BASE_PROFILE_IMAGE_URL = `${APP_ORIGIN}/uploads/profiles/`;
export const BASE_POST_IMAGE_URL = `${APP_ORIGIN}/uploads/posts/`;
export const SOCKET_ENDPOINT = APP_ORIGIN;

export const stories = [
   {
       title: "JavaScript",
       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
   },
   {
       title: "Node.js",
       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
   },
   {
       title: "Express.js",
       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
   },
   {
       title: "MongoDB",
       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
   },
   {
       title: "React.js",
       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
   },
];
