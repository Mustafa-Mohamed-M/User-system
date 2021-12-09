//ensures that a user is admin. This middleware should be used after the auth middleware
module.exports = async (req, res, next)=>{
    if (req.user.group === 'admin'){
        next();
    }
    else{
        res.status(401).send('Unauthorized: only admins can view this page.');
    }
};