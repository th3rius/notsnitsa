import GhostContentAPI from '@tryghost/content-api';

const ghost = GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: 'v3',
});

export default ghost;
