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

export async function uploadDocument(file,{ userQuery, language, topicContext, additionalContext}) {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file); 
    
    if (userQuery) formData.append('userQuery', userQuery);
    if (language) formData.append('language', language);
    if (topicContext) formData.append('topicContext', topicContext);
    if (additionalContext) formData.append('additionalContext', additionalContext);

    try {
        const response = await apiClient.post(`/api/chat/with-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log("respones================================", response?.data);
        return response?.data?.data || response?.data;
    } catch (error) {
        console.log("Error uploading document:", error);
        throw error;
    }
}