import axios from 'axios';
import { Recipe, RecipeDetail } from '../types/recipe';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

export const getRandomRecipes = async (number: number = 12): Promise<Recipe[]> => {
  try {
    const response = await api.get('/random', {
      params: { number }
    });
    return response.data.recipes;
  } catch (error) {
    // Only log the error message and status if available
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
    } else {
      console.error('Error fetching recipes:', error instanceof Error ? error.message : 'Unknown error');
    }
    throw new Error('Failed to fetch recipes. Please try again later.');
  }
};

export const getRecipeById = async (id: number): Promise<RecipeDetail> => {
  try {
    const response = await api.get(`/${id}/information`);
    return response.data;
  } catch (error) {
    // Only log the error message and status if available
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
    } else {
      console.error('Error fetching recipe details:', error instanceof Error ? error.message : 'Unknown error');
    }
    throw new Error('Failed to fetch recipe details. Please try again later.');
  }
};