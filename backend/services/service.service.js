import { safeExecute } from "../db/db.config.js";

export const getGovernmentServicesService = async (languageCode) => {
  const sql = `
    SELECT 
        s.id,
        s.color,
        s.icon,
        s.display_order,
        t.language_code,
        t.category,
        t.title,
        t.description,
        t.prompt
    FROM services s
    JOIN service_translations t ON s.id = t.service_id
    WHERE t.language_code = ?
    ORDER BY s.display_order ASC;
    `;

  const row = await safeExecute(sql, [languageCode]);
  return row;
};
