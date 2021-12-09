import GhostContentAPI from "@tryghost/content-api";

const GHOST_API_URL = process.env.GHOST_API_URL;
const GHOST_API_KEY = process.env.GHOST_API_KEY;

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_API_KEY,
  version: "v3",
});

export default api;
