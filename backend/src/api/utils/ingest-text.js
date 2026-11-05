export const getUploadText=(req)=>{
if(req.file?.buffer){
    return req.file.buffer.toString('utf-8')
}
if(typeof req.body.text==='string' && req.body.text.trim()){
    return req.body.text
}
const error=new Error('upload a .txt file using form field "file" or send json body{"text" :"..."}')
error.statusCode=400;
throw error
}