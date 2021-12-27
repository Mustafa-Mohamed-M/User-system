require("dotenv").config(); //.env stuff
const path = require("path"); //for navigating to the location of a file
const ejs = require("ejs"); //for working with an ejs template file
const nodemailer = require('nodemailer');//for sending emails

const sourceEmail = 'mustafa.mohamed.m@outlook.com';
//create a nodemailer transport once
const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: sourceEmail,
        pass: process.env.EMAIL_PASSWORD,
    },
});

//sends a registration email so that the user can cancel the
//registration if (s)he was not the one who used the email to 
//register
exports.sendRegistration = (req, res)=>{
	const {email, username} = req.body;
	if (email && username){
		let emailTemplate;
		ejs.renderFile(path.join(__dirname, '../templates/user_registered.ejs'), 
		{
			username: username,
			email: email,
		}).then(result=>{
			emailTemplate = result;
			
			return transporter.sendMail({
				from: `Mustafa Mohamed <${sourceEmail}>`,
				to: email,
				subject: 'Account Registration',
				text: `This is to inform you that your email address has been used to create an account on the user system`,
				html: emailTemplate,
			});
		}).then(result=>{
			res.send(`Email sent successfully.`);
		}).catch(err=>{
			console.log(err);
			res.status(500).json({
				message: 'An error occurred while sending the email.',
				error: err,
			});
		});
	}
	else{
		res.send(400).send('Both username and email address are required in request body.');
	}
};

//sends an email to a user to inform him that he has been assigned
// a project and that he should begin working on it as as soon as 
// possible.
exports.sendProjectAssigned = (req, res)=>{
	const {email, username, project_name} = req.body;
	if (email && username && project_name){
		let emailTemplate;
		ejs.renderFile(path.join(__dirname, '../templates/assigned_project.ejs'), 
		{
			username: username,
			email: email,
			project_name: project_name
		}).then(result=>{
			emailTemplate = result;
			
			return transporter.sendMail({
				from: `Mustafa Mohamed <${sourceEmail}>`,
				to: email,
				subject: 'You have been assigned a project',
				text: `You have been assigned project ${project_name}. Please begin working on it as soon as possible.`,
				html: emailTemplate,
			});
		}).then(result=>{
			res.send(`Email sent successfully.`);
		}).catch(err=>{
			console.log(err);
			res.status(500).json({
				message: 'An error occurred while sending the email.',
				error: err,
			});
		});
	}
	else{
		res.status(400).send('project_name, username and email address are required in request body.');
	}
};

//sends an email to a user to inform him that he has been assigned 
// a task and that he should begin working on it as soon as pssible.
exports.sendTaskAssigned = (req, res)=>{
	const {email, username, task_name} = req.body;
	if (email && username && task_name){
		let emailTemplate;
		ejs.renderFile(path.join(__dirname, '../templates/assigned_task.ejs'), 
		{
			username: username,
			email: email,
			task_name: task_name
		}).then(result=>{
			emailTemplate = result;
			
			return transporter.sendMail({
				from: `Mustafa Mohamed <${sourceEmail}>`,
				to: email,
				subject: 'You have been assigned a task',
				text: `You have been assigned task ${task_name}. Please begin working on it as soon as possible.`,
				html: emailTemplate,
			});
		}).then(result=>{
			res.send(`Email sent successfully.`);
		}).catch(err=>{
			console.log(err);
			res.status(500).json({
				message: 'An error occurred while sending the email.',
				error: err,
			});
		});
	}
	else{
		res.send(400).send('task_name, username and email address are required in request body.');
	}
};