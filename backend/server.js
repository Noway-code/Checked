const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT; // Create a .env with PORT="enter port number here"

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})