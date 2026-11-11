import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
// console.log("SCRIPT_DIR=====================",SCRIPT_DIR)
const DEFAULT_PDF_PATH = path.resolve(
  SCRIPT_DIR,
  "../file/Constitution(FDRE)1995).pdf",
);
const PREVIEW_LENGTH = 500;
// console.log("DEFAULT_PDF_PATH======================",DEFAULT_PDF_PATH)
/**
 * Extract raw text from a local PDF file.
 * @param {string} pdfPath - PDF path (defaults to the repository's Amharic PDF).
 * @returns {Promise<string>} The extracted text without normalization.
 */
export async function extractPdfText(pdfPath = DEFAULT_PDF_PATH) {
  const resolvedPath = path.resolve(pdfPath);
  // console.log("resolvedPath==============",resolvedPath)
  let buffer;

  try {
    buffer = await readFile(resolvedPath);
    // console.log("buffer==================",buffer)
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`PDF file not found: ${resolvedPath}`, { cause: error });
    }
    throw new Error(`Could not read PDF file: ${resolvedPath}`, {
      cause: error,
    });
  }

  let parser;
  try {
    parser = new PDFParse({ data: buffer });
    // console.log("parser============================", parser)
    const result = await parser.getText();
    // console.log("result parse.getText=========",result.text)
    if (!result.text.trim()) {
      throw new Error("The PDF contains no extractable text.");
    }
    return result.text;
  } catch (error) {
    if (error.message === "The PDF contains no extractable text.") {
      throw error;
    }
    throw new Error(`Could not extract text from PDF: ${resolvedPath}`, {
      cause: error,
    });
  } finally {
    await parser?.destroy();
  }
}

async function main() {
  const pdfPath = process.argv[2] || process.env.PDF_PATH || DEFAULT_PDF_PATH;
  const text = await extractPdfText(pdfPath);

  console.log(`Extracted ${text.length} characters from: ${path.resolve(pdfPath)}`);
  console.log(
    `\nPreview (first ${Math.min(PREVIEW_LENGTH, text.length)} characters):\n`,
  );
  console.log(text.slice(0, PREVIEW_LENGTH));

  if (!/\p{Script=Ethiopic}/u.test(text)) {
    console.warn(
      "\nWarning: no Ethiopic characters were found. This PDF may use a legacy font encoding or be image-based, so the extracted text may not display as Amharic.",
    );
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error("PDF extraction failed:", error.message);
    if (error.cause) console.error("Cause:", error.cause.message);
    process.exitCode = 1;
  });
}
