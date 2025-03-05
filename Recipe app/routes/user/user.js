const express = require('express');
const { user, recipe, usersecret } = require('../../db');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');


const router = express.Router();
router.use(express.json());

router.post('/signup', async (req, res) => {
    try {
        let { username, password, FirstName, LastName, Email,favorite } = req.body;

        let check = await user.findOne({ username });

        if (!check) {
            await user.create({
                username, password, FirstName, LastName, Email, favorite: []
            });
            res.json({
                message: "user created"
            });
        } else {
            res.json({
                message: "user already exists"
            });
        }
    } catch (err) {
        res.json({
            message: "error"
        });
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let check = await user.findOne({ username, password });
    if (check) {
        let token = jwt.sign({ username }, usersecret);
        res.json({
            message: "login successful",
            token
        });
    } else {
        res.json({
            message: "login failed"
        });
    }
});

// CRUD operations for recipe
router.post('/addrecipe',auth ,async (req, res) => {
    try {
        let userid = await jwt.verify(req.headers.authorization, usersecret);
        if (userid) {
            let { recipename, ingredients, description } = req.body;
            await recipe.create({
                recipename, ingredients, description, username: userid
            });

            res.json({
                message: "recipe added"
            });
        } else {
            res.json({
                message: "unauthorized"
            });
        }
    } catch (err) {
        res.json({
            message: "unauthorized"
        });
    }
});

router.get('/getrecipe',auth, async (req, res) => {
    try {
        let userid = jwt.verify(req.headers.authorization, usersecret);
        if (userid) {
            let recipes = await recipe.find({ username: userid });
            res.json(recipes);
        } else {
            res.json({
                message: "unauthorized"
            });
        }
    } catch (err) {
        res.json({
            message: "unauthorized"
        });
    }
});

router.post('/editrecipe',auth ,async (req, res) => {
    try {
        let userid = jwt.verify(req.headers.authorization, usersecret);
        if (userid) {
            let { recipename, ingredients, description } = req.body;

            await recipe.findOneAndUpdate({ username: userid, recipename }, {
                ingredients, description
            });

            res.json({
                message: "recipe updated"
            });
        } else {
            res.json({
                message: "unauthorized"
            });
        }
    } catch (err) {
        res.json({
            message: "unauthorized"
        });
    }
});

router.delete('/deleterecipe',auth, async (req, res) => {
    try {
        let userid = jwt.verify(req.headers.authorization, usersecret);
        if (userid) {
            let { recipename } = req.body;
            await recipe.findOneAndDelete({ username: userid, recipename });

            res.json({
                message: "recipe deleted"
            });
        } else {
            res.json({
                message: "unauthorized"
            });
        }
    } catch (err) {
        res.json({
            message: "unauthorized"
        });
    }
});

router.post('/savetofav',auth,async (req,res)=>{
    try{
        let userid=jwt.verify(req.headers.authorization,usersecret);
        if(userid){
            let {recipename}=req.body;
            let user1=await user.findOne({username:userid});
            let recipe=await recipe.findOne({recipename});
            user1.favorite.push(recipe);
            await user1.save();
            
        }
    }catch(err){
        res.json({
            message:"unauthorized"
        });
    }
})

module.exports = router;