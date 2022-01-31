const express = require("express");

const router = express.Router();

// File Model
const file = require("../../modules/file");

router.get("/:currentDirectory", async (req, res) => {
  // configure the file_obj as json
  // User.find({filePath:""})
  var url = req.url.replaceAll("/002F", "/")
  url = url.replaceAll("002F", "/")
  file.find({filePath: url}, function(err, file)
  {
    return res.status(200).json({
            files: file,
        });
  })

  //   User.find({fullName:{ '$regex' : user_obj.fullName, '$options' : 'i' }, userType:"teacher"}, function(err, user)
  //   {
  //     new_users = [];
  //     for(var index = 0; index < user.length; index++)
  //     { 
  //       new_users.push({"fullName" : user[index].fullName, "gender" : user[index].gender, "country" : user[index].country})
  //     }
  //     return res.status(200).json({
  //       users: new_users,
  //   });
  // });
  // } catch (e) {
  //   return res.status(400).json({ msg: e.message });
  // }
});



module.exports = router;
