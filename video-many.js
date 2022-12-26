const express = require("express");
const app = express();
const helmet = require("helmet");
const multer = require ("multer");
require("dotenv").config();

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        console.log("hello".file);
        callBack(null,"./upload");
    },
    filename:(req,file,callBack)=>{
        console.log("hi",file);
        callBack(null,file.originalname);
    }
})

app.post("/manyupload",async(req,res)=>{
    try{

        const maxSize = 60 *1024*1024;
        const upload = multer({

            storage:storage,
            fileFilter:(req,file,cb)=>{
                if(file.mimetype==="image/jpg"||
                file.mimetype==="image/jpeg||" ||
                file.mimetype === "image/png"||
                file.mimetype ==="image/webp" ||
                file.mimetype ==="video/mp4"
                
                ){
                    cb(null,true)

                } else{
                    cb(null,false);
                    return cb(new Error("Only jpg, png, jpeg and webp format is allowed"))

                }


            },



            limits:{fileSize:maxSize}
        }).array("many",12)
       
        // multer error handler
        upload(req,res, (error)=> {  
            console.log("body test", req.body);
            console.log("files test", req.files);
    
            if (error instanceof multer.MulterError) {        
                res.status(400).json({
                  status:"Fail",
                  message:error.message
                })
              } else if (error) {      
                res.status(400).json({
                  status:"Fail",
                  message:error.message
                })
              } 
              res.status(200).json({message:"File upload success"});
          })
          
    


    } catch(error){
        console.log(error)
    }
})
app.listen(8000);
console.log("running successfully")