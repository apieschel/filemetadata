'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads/', storage: storage});
const app = express();
const AudioContext = require('web-audio-api').AudioContext
const ac = new AudioContext;

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  ac.decodeAudioData(req.file.buffer, function(buffer) {
          const gain = ac.createGain();
          const playSound = ac.createBufferSource();
          playSound.buffer = buffer;
          console.log(playSound.buffer);
          playSound.connect(gain);
          gain.connect(ac.destination);
          playSound.start(0);
        });     
  /*res.json(//req.file
    {
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path,
      destination: req.file.destination,
      buffer: req.file.buffer
    }
  );*/
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});