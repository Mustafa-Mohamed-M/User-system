const dbConfig = require('../database/config'); //database configuration
const sql = require('mssql'); //SQL Server
const jwt = require('jsonwebtoken'); //json web token
const bcrypt = require('bcrypt'); //password encryption

require('dotenv').config(); //.env stuff

//handle the user login request
exports.login = (req, res) => {
    //get login credentials from req.body
    const {email, password} = req.body;
    //validate credentials
    sql.connect(dbConfig).then(pool =>{
        //execute stored procedure for checking user login
        return pool.request()
        .input('email', sql.VarChar(225), email)
        .input('password', sql.VarChar(225), password)
        .execute('checkUserLogin')
    }).then((result, err)=>{
        //
        console.log(err);
        if (err){
            //an error occurred. Notify res
            res.status(500).send('An error occurred while validating login credentials.');
        }
        else{
            //a row *may* have been returned from database
            if (result.recordset){
                //check password
                //SELECT TOP 1 [id], [username], [password] FROM [user] WHERE [email] = @email;
                const {id, username, password} = result.recordset;
                bcrypt.compare(password, req.body.password, (err, result)=>{
                    if (err || result === false){
                        //invalid password
                        console.log(err);
                        console.log(result);
                        res.status(401).send('Invalid login credentials.');        
                    }
                    else{
                        //generate jwt token for user
                        const stuffInToken = {
                            id,
                            username,
                            email,
                            group: 'user' //the user is a normal user, not an admin!
                        };
                        const token = jwt.sign(stuffInToken, process.env.SECRET_KEY, {expiresIn: 3600});
                        res.json({token});
                    }
                });
            }   
            else{
                //no matching credentials. Email not found
                res.status(401).send('Invalid login credentials.');
            }

        }
    }).catch(err =>{
        //an error occurred. Notify res
        console.log(err);
        res.status(500).send('An error occurred while validating login credentials.');
    });
};

//handle the user registration request
exports.signup = (req, res) =>{
    //get the user info
    const {username, email, password, phone_number} = req.body;
    if (username && email && password && phone_number){
        //execute stored procedure for signing up the user
        sql.connect(dbConfig).then(pool => {
            return pool.request()
            .input('username', sql.VarChar(50), username)
            .input('email', sql.VarChar(225), email)
            .input('password', sql.VarChar(225), password)
            .input('phone_number', sql.VarChar(15), phone_number)
            .output('inserted', sql.Bit)
            .execute('insertUser');
        }).then((result, err) => {
            if (err){
                res.status(500).send('An error occurred. Please try again later.');
            }
            else{
                //check if the user was actually inserted. The output value should be 1.
                if (result.output.inserted === 1){
                    //user was inserted
                    res.send(201).send('Account created successfully.');
                }
                else{
                    //something went wrong. e.g. An email was repeated
                    res.status(500).send('An error occurred. Please try again later.');
                }
            }
        }).catch(err => {
            res.status(500).send('An error occurred. Please try again later.');
        });
    }
    else{ 
        //not all information was not provided
        res.status(400).send('username, email, password and phone_number are required.');
    }
};