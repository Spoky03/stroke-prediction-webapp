import axios from 'axios';
import { API_URL } from './constants.ts';

// Create an axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const getRequest = async (endpoint: string) => {
    try {
        const response = await apiClient.get(endpoint);
        return response;
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
    }

// Function to handle POST requests
export const postRequest = async (endpoint: string, data: unknown) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response;
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}
