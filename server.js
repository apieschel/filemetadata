'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/music')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.wav')
  }
});
const upload = multer({storage: storage});
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  /*res.json(
    {
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path,
      destination: req.file.destination
    }
  );*/
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});