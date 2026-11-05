import { chunksText } from "../../utils/chunks.js";
import { ChromaClient } from "chromadb";
import {
  generateAnswer,
  getDocumentEmbedding,
  getQuestionEmbedding,
} from "../../utils/gemini.js";
const TOP_K = 2;
const collectionName = process.env.CHROMA_COLLECTION || "infoBot";
let chromaClient;
const getChromaClient = () => {
  if (!chromaClient) {
    chromaClient = new ChromaClient();
  }
  return chromaClient;
};
export const ingestChromaDbService = async (text) => {
  const chunkText = chunksText(text);
  if (chunkText.length == 0) {
    const error = new Error("No text chunks found in the uploaded file");
    error.statusCode = 400;
    throw error;
  }
  const chroma = getChromaClient();

  try {
    await chroma.heartbeat();
  } catch (err) {
    console.log(err);
  }

  const collection = await chroma.getOrCreateCollection({
    name: collectionName,
    metadata: { "hnsw:space": "cosine" },
    embeddingFunction: null,
  });
  const ids = [];
  const embeddings = [];
  const documents = [];
  for (let i = 0; i < chunkText.length; i++) {
    const chunk = chunkText[i];
    const embedding = await getDocumentEmbedding(chunk);
    ids.push(`chunk-${i}`);
    embeddings.push(embedding);
    documents.push(chunk);
  }
  await collection.add({
    ids,
    embeddings,
    documents,
  });
  return {
    chunkCount: chunkText.length,
    store: "chroma-db",
    collection: collectionName,
  };
};

const getCollection = async () => {
  const chroma = getChromaClient();
  try {
    await chroma.heartbeat();
  } catch (err) {
    console.log(err);
  }

  return chroma.getCollection({
    name: collectionName,
    embeddingFunction: null,
  });
};
export const queryChromaService = async (question) => {
  const collection = await getCollection();
  const count = await collection.count();
  if (count === 0) {
    const error = new Error(
      "No document indexed yet post a.txt file to /api chroma -db first.",
    );
    error.statusCode = 503;
    throw error;
  }
  const questionEmbedding = await getQuestionEmbedding(question);
  const result = await collection.query({
    queryEmbeddings: [questionEmbedding],
    nResults: TOP_K,
    include: ["documents", "distances"],
  });

  // console.log(result)

  const bestMatch = (result.documents?.[0] ?? []).filter(Boolean);
  const distances = result.distances?.[0] ?? [];
  const scores = 1 - (distances[0] ?? 1);

  const answer = await generateAnswer({ question, context: bestMatch });

  return {
    question,
    bestMatch,
    score: Number(scores.toFixed(4)),
    answer,
    store: "chroma-db",
    collection: collectionName,
  };
};
