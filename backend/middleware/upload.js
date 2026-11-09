import multer from "multer";


const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  
  fileFilter: (req, file, cb) => {

    if (
      file.mimetype.startsWith('image/') || 
      file.mimetype === 'application/pdf' || 
      file.mimetype.includes('word') ||
      file.mimetype.includes('document')
    ) {
      cb(null, true);
    } else {
      console.log("Invalid file type rejected");
      cb(new Error('only .pdf, word and image file is valid!'), false);
    }
  },
}).single("file"); 

export const handleDocumentUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer Upload Error:", err.message);
      return res.status(400).json({ success: false, error: err.message });
    }
    

    if (!req.file) {
      return res.status(400).json({ success: false, error: "NOT FOUND file Invalid!" });
    }

    next();
  });
};