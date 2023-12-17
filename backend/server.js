const express = require('express');
const app = express();
const port = process.env.PORT; // Create a .env with PORT="enter port number here"

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})