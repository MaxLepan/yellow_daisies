const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.listen(port, () =>
  console.log(`Example app listening on port 3001 !`),
);