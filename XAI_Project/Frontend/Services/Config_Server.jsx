/**
 * Configuration for the backend server URL. Adjusts based on the environment (development or production).
 */
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://xai-study.vercel.app'
    : 'http://localhost:5000';

export default BASE_URL;