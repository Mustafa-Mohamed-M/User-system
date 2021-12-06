const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', userRoutes);
// app.use('/auth/admin', adminRoutes);
const auth = require('./middleware/auth');
const isAdminAuth = require('./middleware/isAdmin');
app.use('/admin', [auth, isAdminAuth], adminRoutes);
const port = 5000;

//start the server
app.listen(port, ()=>{
    console.log(`Users app listening on port ${port}.`)
});