import { getGovernmentServicesService } from "../services/service.service.js";
export const getGovernmentServicesComponent = async (req, res, next) => {
  const languageCode = req.query.languageCode;
  const result = await getGovernmentServicesService(languageCode);
  res.status(200).json({
    success: true,
    message: "governmental service get successfully",
    data: result,
  });
};
