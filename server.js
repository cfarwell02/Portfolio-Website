const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/submit-form', (req, res) => {
    console.log(req.body);
    res.send('Form recieved');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});