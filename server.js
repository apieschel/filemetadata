'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = file.fieldname + '-' + Date.now()
    const dir = process.cwd() + '/public/music/' + path;
    console.log(dir);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    
    cb(null, 'public/music/'  + path);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.wav');
  }
});
const upload = multer({storage: storage});
const app = express();

// https://stackoverflow.com/questions/38104090/how-can-i-read-files-from-directory-and-send-as-json-to-client
const fs = require('fs');
let path = process.cwd() + '/public/music/';
let logs = [];

function readDirectory(callback){
  fs.readdir(path, function(err, items) {
     logs.push(items);
     callback(logs);       
  }); 
}

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/music', function(req,res){
   logs = []; 
   readDirectory(function(logFiles){
     res.json({files : logFiles});
   });
});

app.get('/music/directory', function(req,res){
   console.log(req.query);
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  
  res.json(
    {
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path,
      destination: req.file.destination,
      folderName: req.body.title
    }
  );
  //res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});