var express = require('express');
var router = express.Router();
const Users = require('../models/users');



router.get('/', function (req, res) {
  console.log(req.session.user)
  if (req.session.user) {
    if(req.session.user.role === 'admin'){
      return res.redirect('/admin');
    }
    else if(req.session.user.role === 'operario'){
      return res.redirect('/operario')
    }
  }
  return res.render('login');
});


router.get('/api/user/email', (req, res) => {
  console.log(req.session)
  if (req.session.user) {
    const userEmail = req.session.user.email;
    res.json({ email: userEmail });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Falta el email o la contraseña.' });
  }

  Users.getUserByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ code: 'UE', message: 'Unknown Error!' });
    }

    if (user && user.password === password) {
      req.session.user = user.toJSON();

      return req.session.save(function (err) {
        if (err) return res.status(500).json({ code: 'UE', message: 'Unknown Error!' });
        console.log('Success:', user);
        return res.json({ success: true });
      });
    }

    return res.status(421).json({ success: false, message: 'Credenciales inválidas.' });
  });
});



router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ code: 'UE', message: 'Unknown Error!' });
    }
    return res.json({ success: true });
  });
});





router.post('/register', function(req, res){
  console.log("Data:", req.body)

  return Users.createUser(req.body, (error, b) => {
    if(error){
        return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
    }
    res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
  });
})


router.post('/loginback', (req, res) => {
  const { email, password } = req.body;

  Users.getUserByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ code: 'UE', message: 'Unknown error' });
    }

    if (!user) {
      return res.status(404).json({ code: 'NF', message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ code: 'IC', message: 'Invalid credentials' });
    }

    // Guardar el usuario en la sesión
    req.session.user = user;
    req.session.save((error) => {
      if (error) {
        return res.status(500).json({ code: 'UE', message: 'Unknown error' });
      }

      res.json({ code: 'OK', message: 'Login successful', user: user.toJSON() });
    });
  });
});


module.exports = router;
