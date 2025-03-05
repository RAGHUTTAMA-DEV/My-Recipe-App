
const jwt=require('jsonwebtoken');
const {usersecret}=require('../db');

async function auth(req,res,next) {
    try{
        let userid=await jwt.verify(req.headers.authorization,usersecret);
    
    
    if(userid){
        req.username=userid;
        next();
    }else{
        res.json({
            message:"unauthorized"
        });
    }
}catch(err){
    res.json({
        message:" Compete unauthorized"
    });
}
}