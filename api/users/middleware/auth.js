const jwt = require('jsonwebtoken');
require('dotenv').config();

//verify the token sent with a request

const verifyToken = (req, res, next)=>{
    //get auth header
    const authHeader = req.headers.authorization;
    if (authHeader){//header is provided
        //verify the token
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, info)=>{
            if (err){
                //something went wrong or the token is not valid.
                res.status(401).send("Unauthorized: Token is not valid.");
            }
            else{
                req.user = info; //token is valid
                next(); //call next route handler
            }
        });
    }
    else{
        //no header provided
        res.status(401).send('Unauthorized: No auth found in header');
    }
};

module.exports = verifyToken;