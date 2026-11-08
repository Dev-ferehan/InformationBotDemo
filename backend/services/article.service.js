import { safeExecute } from "../db/db.config.js";

export const articleService = async (languageCode) => {
  const sql = `
  SELECT 
  a.id,
  a.service_id,
  a.minutes,
  st.language_code,
  st.category AS category_label,
  st.title AS title,        
  at.summary AS summary,     
  at.steps AS steps         
FROM articles a
JOIN services s ON a.service_id = s.id
JOIN service_translations st ON s.id = st.service_id
JOIN article_translations at ON a.id = at.article_id AND st.language_code = at.language_code
    WHERE st.language_code = ?;

    `;

  const row = await safeExecute(sql, [languageCode]);
  return row;
};
