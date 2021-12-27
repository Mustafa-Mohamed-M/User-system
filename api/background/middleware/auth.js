const axios = require('axios');

//uses the users service (listening on port 5000)

const verify = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    if (authHeader){
        try {
            let response = await axios.post(`http://localhost:5000/auth/verify`, {}, {
                headers: {
                    'Authorization': authHeader,
                }
            });
            if (response.status === 200){
                //console.log(response.data);
                req.user = response.data;
                if (req.user.group === 'user'){
                    next(); //call next route
                }
                else{
                    // res.status(401).send('Unauthorized: only users can access this page.');
                    next();
                }
            }
            else{
                // console.log(response);
                res.status(401).send('Unauthorized: Invalid token');
            }
        } catch (error) {
            if (error.response){
                if (error.response.status === 401){
                    res.status(401).send('Unauthorized');
                }
            }
            else{
                res.status(500).send('Internal server error');
            }
            
        }
    }
    else{
        res.status(401).send('Unauthorized: No token found in header.');
    }
};

module.exports = verify;