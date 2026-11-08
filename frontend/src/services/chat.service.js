import { apiClient } from "./api.client.js";

export const sendMessageToAI = async ({
  userQuery,
  language,
  topicContext,
  additionalContext,
}) => {
  try {
    const response = await apiClient.post(`/api/chat`, {
      userQuery,
      language,
      topicContext,
      additionalContext,
    });

    return response?.data?.data || response?.data;
  } catch (error) {
    console.log(error);
  }
};


export async function uploadDocument(file) {
    if (!file) return null
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    return { name: file.name, size: file.size, type: file.type }
  }
  
  
  