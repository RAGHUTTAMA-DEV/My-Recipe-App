const userrouter=require('./routes/user/user');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());    

app.use('/user',userrouter);


async function main(){
    await mongoose.connect("YOur Mongodb url);
    app.listen(3000,()=>{
        console.log("server started");
    })
}

main();
