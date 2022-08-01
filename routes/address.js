var express = require('express');
var router = express.Router();
const AddressModel = require('../src/models/address')

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
      { $replaceRoot: {
        "newRoot": '$user'
      }},


      {
        '$sort':{name:1}
      },

      {
        $limit:10
      },

      {
        
      }
    ])
  
    res.status(200).json(allUsers)
  })

module.exports = router;
