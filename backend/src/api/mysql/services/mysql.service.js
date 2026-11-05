import { safeExcute } from "../../../db/db.config.js";
import { chunksText } from "../../utils/chunks.js";
import { cosineSimilarity} from '../../utils/cosine.js'
import { getDocumentEmbedding,getQuestionEmbedding,generateAnswer } from "../../utils/gemini.js";

const top_k=3
export const ingestMysqlService = async (text) => {
  const chunks = chunksText(text);
  //   console.log(chunks)
  if (chunks.length === 0) {
    const error = new Error("no text chunks found in the uploaded file ");
    error.statusCode = 400;
    throw error;
  }

  const insertQuery = "INSERT INTO infoBot (content, embedding)  VALUES (?,?)";

  for (const chunk of chunks) {
    let embedding = await getDocumentEmbedding(chunk);
    await safeExcute(insertQuery, [chunk, JSON.stringify(embedding)]);
  }
  return {
    chunkCount: chunks.length,
    store: "mysql",
  };
};


export const questionAnswerMysqlService = async (question) => {

const selectQuery = "SELECT content, embedding FROM infoBot";
const [ rows] = await safeExcute(selectQuery);
// console.log(rows[0])
if (!rows.length ) {
    const error = new Error("no document found in the database to answer the question");
    error.statusCode = 400;
    throw error;
}
const questionEmbedding = await getQuestionEmbedding(question);
const scored= rows.map(({content,embedding}) => {
    const storedEmbedding =typeof embedding === 'string' ? JSON.parse(embedding) : embedding;
    const similarity = cosineSimilarity(questionEmbedding, storedEmbedding);
    return { content, score:similarity };
  }
)
scored.sort((a,b)=>b.score - a.score)
const topMatches=scored.slice(0,top_k)
const bestMatches=topMatches.map(match=> match.content)

const answer=await generateAnswer({question,context:bestMatches});
return{
    question,
    bestMatches:topMatches,
    score:Number(topMatches[0].score.toFixed(4)),
    answer,
    store:'mysql'
}

}