export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://xai-project.vercel.app'
    : 'http://localhost:5000';

export default BASE_URL;