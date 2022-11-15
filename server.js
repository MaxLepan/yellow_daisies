const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.listen(3001, () =>
  console.log(`Example app listening on port 3001 !`),
);