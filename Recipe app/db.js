const mongoose=require('mongoose');

const usersecret="samera";

const schema=mongoose.Schema;

const userSchema=new schema({
    username:{type:String,unique:true},password:String,FirstName:String,LastName:String,Email:String,"favorite":[String]
})

const recipeSchema=new schema({
    recipename:String,ingredients:String,description:String,username:String
})

const user=mongoose.model('user',userSchema);
const recipe=mongoose.model('recipe',recipeSchema);


module.exports={
    user,recipe,usersecret
}