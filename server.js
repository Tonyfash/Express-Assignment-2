const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());
const router = require('./routes/groceryRoute')

app.use(router);



app.listen(PORT, ()=> {
console.log(`Server is running on PORT: ${PORT}`)
});
