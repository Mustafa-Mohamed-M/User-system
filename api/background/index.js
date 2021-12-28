const express = require("express");
const cors = require("cors");
const emailRoutes = require('./routes/emailRoutes');
const cron = require('node-cron');
const sql = require('mssql');
const dbConfig = require('./database/config');
const AfricasTalking = require('africastalking');
require('dotenv').config();

//initialize the Africastalking
const africastalking = AfricasTalking({
	apiKey: process.env.AFRICAS_TALKING_API_KEY, 
	username: process.env.AFRICAS_TALKING_USERNAME
});

//send SMSs every few moments
cron.schedule('* * * * *', () => { //run every minute!
	sql.connect(dbConfig).then(pool =>{
		return pool.request()
		.execute('getAllUsers');
	}).then((result, err)=>{
		if (err){
			console.log(err);
		}
		else{
			console.log(`Preparing to send SMS to ${result.recordset.length} users.`);
			for (let i = 0; i < result.recordset.length; i++){

				const user = result.recordset[i];
				let {username, phone_number} = user;
				phone_number = '+254724572377';
				const message = `Hello ${username}. Remember to work on your project today.`;
				console.log(`Sending SMS to ${phone_number}`);
				africastalking.SMS.send({
					to: phone_number,
					message,
				}).then((result, err)=>{
					if (err) console.log(err)
					else console.log(`Message sent successfully.`);
				});
			}	
		}
		
	}).catch(err=>{
		console.log(err);
	})
});

const port = 5003;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/email', emailRoutes);

app.listen(port, ()=>{
	console.log(`The background services app is running on port ${port}`);
})