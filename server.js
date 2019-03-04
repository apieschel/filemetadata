'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  res.json(//req.file
    {
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  );
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});