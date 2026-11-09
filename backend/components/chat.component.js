import { sendMessageToAI ,chatWithFileService} from "../services/chat.service.js";

export const chatComponent = async (req, res, next) => {
  try {
    const { userQuery, language, topicContext, additionalContext } = req.body;

    if (!userQuery) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const aiResponse = await sendMessageToAI({
      userQuery: userQuery,
      targetLanguage: language,
      topicContext: topicContext || "General Public Service",
      additionalContext: additionalContext || "Direct User Question",
    });


    return res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    next(error);
  }
};





export const chatWithFileController = async (req, res, next) => {
  try {
    const file = req.file; 
    const userQuery = req.body.userQuery || "explain about this image or file";
    const language = req.body.language || 'en';
    const topicContext = req.body.topicContext || '';

    const aiResponse = await chatWithFileService({
      file,
      userQuery,
      language,
      topicContext
    });


    res.json({ success: true, data: aiResponse });

  } catch (error) {
    next(error);
  }
};