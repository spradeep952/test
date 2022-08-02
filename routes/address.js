var express = require('express');
var router = express.Router();
const AddressModel = require('../src/models/address')
const UserModel = require('../src/models/user')

router.post('/save_address',async(req,res)=>{
    await new AddressModel(req.body).save()
    const ress = await AddressModel.find({})
    res.status(200).json(ress)

})

router.get('/getUserByLocation/:loc',async(req,res)=>{
    const allUsers = await AddressModel.aggregate([
      {
        $match:{
          address: req.params.loc,
        }
      },
      {
        $lookup:{
            from : "users",
            localField : "user_id",
            foreignField : "_id",
            as : "user"
        }
      },
      {
        $unwind : "$user"
      },
      { 
        $replaceRoot: {
          "newRoot": "$user"
        }
      },
    ])
  
    res.status(200).json(allUsers)
  })

  router.get('/getLocationByUser/:email', async (req, res, next) => {
    const _email = req.params.email;
    try{
      const userList = await UserModel.aggregate([
        {
          $match:{
            email : _email,
          }
        },
        {
          $lookup:{
            from : "addresses",
            localField : "_id",
            foreignField : "user_id",
            as : "user"
          } 
        },
        {
          $unwind: "$user"
        },
        {
          $replaceRoot: {
            "newRoot":"$user"
          }
        }
      ])

      return res.status(200).json(userList)
  }
    catch(err){
      return res.status(500).json({"message":"Something went wrong."})
    }
  })


// comment for release1 
// comment for release 2


// after stash 
module.exports = router;
