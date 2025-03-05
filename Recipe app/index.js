const userrouter=require('./routes/user/user');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());    

app.use('/user',userrouter);


async function main(){
    await mongoose.connect('mongodb+srv://raghuttama03:samera2007@cluster0.sylhh.mongodb.net/recipe');
    app.listen(3000,()=>{
        console.log("server started");
    })
}

main();