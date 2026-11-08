import { apiClient } from "./api.client.js";

async function getGovernmentalService(languageCode) {
  try {
    const response = await apiClient.get(`/api/categories`, {
      params: { languageCode },
    });

    return response?.data?.data || response?.data;
  } catch (error) {
    console.log(error);
  }
}
async function fetchArticle(languageCode){
  try {
    const response = await apiClient.get(`/api/articles`, {
      params: { languageCode },
    });

    return response?.data?.data || response?.data;
  } catch (error) {
    console.log(error);
  }
}
export const governmentalService = {
  getGovernmentalService,
  fetchArticle
};
