const UserModel = require('../src/models/user')
const multer = require('multer')

module.exports.login = async (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await UserModel.findOne({"email":email})
  
    if(!user){
      return res.status(404).json({"message":"user not found."})
    }
    else if(user.password==password){
      return res.status(200).json(user)
    }
    return res.status(401).json({"message":"Invalid user credentials."})
}

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./services')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname+"myfile")
    }
  })

  function fileFilter(req, file, cb){
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    
    if (mimetype) {
        return cb(null, true);
    }
    cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
  }
  
  module.exports.upload = multer({
    storage:storage,
    fileFilter: fileFilter
  })