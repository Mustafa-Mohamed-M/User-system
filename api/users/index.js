const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');

app.use('/auth', userRoutes);
const auth = require('./middleware/auth');

const port = 5000;

//start the server
app.listen(port, ()=>{
    console.log(`Users app listening on port ${port}.`)
});