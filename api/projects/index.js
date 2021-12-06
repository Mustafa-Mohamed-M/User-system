const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 5001;

const auth = require('./middleware/auth');

const projectRoutes = require('./routes/projectRoutes');

app.use('/projects', auth, projectRoutes);

//start the server
app.listen(port, ()=>{
    console.log(`Projects app listening on port ${port}.`)
});