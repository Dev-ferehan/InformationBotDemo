export const chunksText = (text, chunkSize = 800, overlap = 100) => {
    const chunks = [];
    let index = 0;
  
    // ጽሁፉን በ chunkSize መጠን መክፈል (Overlapping በመጠቀም ትርጉም እንዳይበላሽ)
    while (index < text.length) {
      let chunk = text.slice(index, index + chunkSize);
      
      // ባዶ ቦታዎችን አስተካክሎ ማስገባት
      const trimmedChunk = chunk.trim();
      if (trimmedChunk.length > 0) {
        chunks.push(trimmedChunk);
      }
      
      index += chunkSize - overlap; // Overlap ማድረግ (context እንዳይጠፋ)
    }
  
    return chunks;
  };