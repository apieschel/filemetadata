'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
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
  /*ac.decodeAudioData(req.file.buffer, function(buffer) {
          const gain = ac.createGain();
          const playSound = ac.createBufferSource();
          playSound.buffer = buffer;
          console.log(playSound.buffer);
          playSound.connect(gain);
          gain.connect(ac.destination);
          playSound.start(0);
        });*/     
  res.json(//req.file
    {
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path,
      destination: req.file.destination,
      buffer: req.file.buffer
    }
  );
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});