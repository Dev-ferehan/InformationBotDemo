import { articleService } from "../services/article.service.js";
export const articleComponent = async (req, res, next) => {
  const languageCode = req.query.languageCode;
  const result = await articleService(languageCode);
  res.status(200).json({
    success: true,
    message: " article guide get successfully",
    data: result,
  });
};
