const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
//port http
app.listen(port, () =>
  console.log(`Example app listening on port ${port} !`),
);
app.use(express.static(__dirname + '/public'));

//select link to start
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});