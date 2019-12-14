const express = require('express');
const router = express.Router();
const User = require('../model/user');
let emails;

router.get('/add', async (req, res) => {
  res.render('index');
});

router.post('/add', async (req, res, next) => {
  const user = new User(req.body);
  user.save().then(resa=>{
    if(resa){
      res.send({
      error: true, 
      message: "Kayıt Yapıldı"
       });}
    else{ res.send({
      error: false, 
      message: "Kayıt Yapılmadı"
       });}
})
  
});




router.get('/', async (req, res) => {
  res.render('edit');
});

router.post('/login', async (req, res) => {
 User.findOne({email: req.body.email}).then(resa=>{
    if(resa){
       res.send({
        error: true, 
        message: resa.email
         });
        
    }
    else{ res.send({
      error: false, 
      message: "Kullacı adı veya şifre yanlış"
       });}
        emails=resa.email 
      
      
})

});

router.get('/message', async (req, res) => {
  
  res.render('message', {
    user:emails
  })
});


module.exports = router;