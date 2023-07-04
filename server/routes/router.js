const express = require('express')
const router = express.Router();
const users = require("../models/userSchema");


router.post('/register',async (req,res) =>{
    const {name,email,age,desc,address,phone} = req.body;

    if(!name || !email || !age || !desc || !address || !phone){
        res.status(422).send('Please fill the data carefully');
    }

    try{
        const userPresent = await users.findOne({email : email});
        console.log(userPresent);

        if(userPresent){
            res.status(422).send('User is already present');
        }else{
            const addUser = new users({
                name,email,age,desc,address,phone
            })
            //save the data in database..
            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }

    }catch(err){
        res.status(422).send(err)
    }
})

router.get('/getdata',async (req,res) =>{
    try{
       const userData = await users.find();
       res.status(201).json(userData);
       console.log(userData);
    }
    catch(error){
        res.status(422).send(error)
    }
})

//we will be fetching individual usrs/.
router.get('/getuser/:id',async(req,res) =>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id : id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    }
    catch(error){
        res.status(422).json(error)
    }
})

//update user id..

router.patch('/updateuser/:id',async(req,res) =>{
    try{
        const {id} = req.params;

        const updateuser = await users.findByIdAndUpdate(id,req.body,{
          new : true,
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    }
    catch(error){
        res.status(422).json(error)
    }
})

router.delete('/deleteuser/:id',async(req,res) =>{
    try{
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id : id});

        console.log(deleteuser);
        res.status(201).json(deleteuser);
    }
    catch(error){
        res.status(422).json(error)
    }
})

module.exports = router;