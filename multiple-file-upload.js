const express = require("express");
const app = express();
const helmet = require("helmet");
const multer = require ("multer");

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

const upload = multer({storage:storage}).array("myfile",3);
app.post("/multiple",(req,res)=>{
    upload(req,res,(error)=>{
        if(error){
            res.send("file upload fail");
        } else {
            res.send("file upload success")
        }
    })
})

app.listen(8000);
console.log("server run success");