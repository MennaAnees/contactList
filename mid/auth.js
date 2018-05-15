//require auth file..
const validUsers = require('../auth');

module.exports= function(req,resp,next){
  var flag=0;
  if(req.body.auth && req.body.deviceToken &&  req.body.fingerPrint){
    validUsers.forEach(function(value){
      if(req.body.auth === value.auth &&
         req.body.deviceToken === value.deviceToken
         && req.body.fingerPrint === value.fingerPrint){
        req.body.userId = value.userId
         next()
        }
        else{
          flag++
        }

    })
    if (flag === validUsers.length){
      return resp.status(403).send({
          success: false,
          message: 'The User is not Authorized.'
      })
      ;}
  }
  else{
    return resp.status(403).send({
        success: false,
        message: 'Not Authorized.'
    });
  }
}
