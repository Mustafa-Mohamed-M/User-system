const express = require("express");
const cors = require("cors");
const emailRoutes = require('./routes/emailRoutes');
const adminAuth = require('./middleware/isAdmin');
const auth = require('./middleware/admin');

const port = 5003;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/email', [auth], emailRoutes);

app.listen(port, ()=>{
	console.log(`The background services app is running on port ${port}`);
})