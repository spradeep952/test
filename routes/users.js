var express = require('express')
var router = express.Router()
var UserModel = require('../src/models/user')
const ObjectId =require('mongoose').Types.ObjectId;
var multer = require('multer')
const userController = require('../controller/users_controller')


// get the list of all users
router.get('/', async (req, res, next) => {
  try{
    const allUsers = await UserModel.find({})
    return res.status(200).json(allUsers)
  }
  catch(err){
    console.error(err.message)
    return res.status(500).json({"message":"Oops! I dont know what happened."})
  }
})

// create a new user in the db
router.post('/create_user', async (req, res, next) => {
  let newUser = new UserModel(req.body)
  
  try{
    await newUser.save()
    return res.status(200).json({"message":"user created successfuly"})
  }
  catch(err){
    console.error(err)
    return res.status(500).json({"message":err.message})
  }
})


router.get('/full_details/:id',async(req,res)=>{

  //user
  //address
  // join

  const fullDetails = await UserModel.aggregate([
    {
      $match:{
        _id: new ObjectId(req.params.id)
      }
    },
    {
      $lookup:{
        from:'addresses',
        localField:'_id',
        foreignField:'user_id',
        as:'address'
      }
    },
  ])

  res.status(200).json(fullDetails)
})

router.post(
  '/login',
  userController.login
  )


router.put('/update', async (req, res, next) => {
  const email = req.body.email
  try{
    await UserModel.updateOne({"email":email}, req.body)
    return res.status(200).json({"message":"user updated successfully"})
  }
  catch(err){
    console.error(err.message)
    return res.status(500).json({"message":"Oops! Something went wrong."})
  }
})

router.delete('/delete/:id', async(req, res, next) => {
  const id = req.params.id
  try{
    await UserModel.deleteOne({"_id":id})
    return res.status(200).json({"message":"user deleted successfully."})
  }
  catch(err){
    console.error(err)
    return res.status(500).json({"message":"Oops! Something went wrong."})
  }
})

router.get('/findUser/:email', async(req, res, next) => {
  const _email = req.params.email
  try{
  const _user = await UserModel.findOne({'email': _email})
  if(!_user){
    return res.status(404).json({"message":"user not found"})
  }
  return res.status(200).json(_user)
}catch(e){

}

})

router.get('/sort', async(req, res, next) => {
  try{
    const _sortedUsers = await UserModel.find().sort({name:'asc'})
    res.status(200).json(_sortedUsers)
  }
  catch(err){
    res.status(500).json({"message":"Oops something went wrong"})
  }
})

router.post('/uploadFile', userController.upload.single('profile-file') , async (req, res, err) =>{
  if(err){
    return res.status(200).json({"message":"uploaded"})
  }
  return res.status(500).json({"message":"Something went wrong.", "error_message":err.message})
})



module.exports = router
 