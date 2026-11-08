import { sendMessageToAI } from "../services/chat.service.js";

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
