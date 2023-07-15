var express = require('express');
var router = express.Router();
const Users = require('../models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  return Users.getUser((error, elems)=> {
      if (error) {
          return res.status(500).json({ code: 'UE', message: 'Unknown error'})
      }
      res.json(elems);
  });
});

router.post('/', function (req, res){
  const { user } = req.body;
  console.log('Data:', user);
  
  return Users.createUser(user, (error, b) => {
      if(error){
          return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
      }
      res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
  });
});

module.exports = router;
