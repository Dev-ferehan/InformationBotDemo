export const chunksText=(text)=>{
   const lines=text.split('\n')
    const chunks=[];
    for(const line of lines){
        const trimmedLine=line.trim();
if(trimmedLine.length > 0){
    chunks.push(trimmedLine)
}
    }
    return chunks;
}