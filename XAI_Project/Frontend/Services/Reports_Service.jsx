import axios from 'axios';
import { BASE_URL } from './Config_Server';
/**
 * Fetch a specific XAI report from the backend server using the domain and ID.
 * @param {string} domain - The domain of the report (e.g., "diabetes", "hr", "llm").
 * @param {string} id - The unique identifier for the specific report to fetch.
 * @returns {Promise<Object>} - Report data in JSON format.
 * @throws Will throw an error if the request fails or if the report is not found.
 */
export const fetchReport = async (domain, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/reports/${domain}/${id}`);
        return response.data; // report json data from Firestore
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error; // error
    }
};