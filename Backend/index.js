const express = require('express')
const multer  = require('multer')
const app = express()
const path =require('path')
const port = 900
const docxtopdf = require('docx-pdf');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
     cb(null,file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
  app.post("/convertTOPDF", upload.single('avatar'),(req, res, next)=> {
    try{
        //definign a path for output
        if(!req.file){
          return res.status(400).json({message:"No file Uploaded"});
        }
        let outputPath=path.join(__dirname,"files",`${path.parse(req.file.originalname).name}.pdf`
)
        
        docxtopdf(req.file.path,outputPath , (err,result)=>{
            if(err){

              console.log(err);
              return res.status(500).json({message:"error"});
                
              }
            res.download(outputPath,()=>{
              console.log("File Downloaded");
            })

            
          });

    }
    catch(error)
    {
        console.log(error);
        
        return res.status(500).json({message:"Internal Server error"});
    }
    
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})