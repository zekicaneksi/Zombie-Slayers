# Zombie-Slayers

## A Phaser 3 game


![game preview](https://raw.githubusercontent.com/zekicaneksi/Zombie-Slayers/main/gameplay.gif)

### Note

index.html should be opened via web server. simply opening the html won't work.
![error](https://raw.githubusercontent.com/zekicaneksi/Zombie-Slayers/main/error.png)

#### Example Node.js code (using Express);
(the project is assumed to be in the 'public' folder)

```
var express = require('express');
const path = require('path');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(2000);
```
