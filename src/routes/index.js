const express = require('express');
const router = express.Router();
const User = require('../model/user');
router.get('/add', async (req, res) => {
  res.render('index');
});

router.post('/add', async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.redirect('/');
});



router.get('/', async (req, res) => {
   res.render('edit');
});

router.post('/login', async (req, res) => {
 User.findOne({email: req.body.email}).then(res=>{
    if(res){console.log('başarılı')}
    else{console.log('başarısız')}
})
  
});



module.exports = router;
