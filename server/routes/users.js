const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

/** Models */
const User = require('../models/User');

signToken = user => {
   return JWT.sign({
      iss: 'loginExample',
      sub: user.id,
      iat: new Date().getTime(),
      //exp: new Date().setDate(new Date().getDate() + 1) //el dia actual + 1
   }, 'authenticationExample', { expiresIn: '1d' })
}

/** Registro */
router.post('/signup', async (req, res) => {
   try {
      const { email, password } = req.body;
   
      //Compruebo que el usuario no este ya registrado
      const verifyEmail = await User.findOne({email});
   
      if (verifyEmail) {
         return res.status(409).json({error: 'El email ya existe'});
      }
   
      //Creo un nuevo usuario
      const newUser = new User({email, password});
   
      //Lo guardo en la DB
      await newUser.save();
   
      const token = signToken(newUser);
      //Si esta todo ok, respondo con el token
      res.status(200).json({ token });
   } catch (err) {
      res.send(err);
   }
});


/** Logeo */
router.post('/signin', passport.authenticate('local', { session: false }) ,async (req, res) => {
   //Genero el token cuando logea
   const token = signToken(req.user);

   res.status(200).json({ token });
});


/** Secret */
router.get('/secret', passport.authenticate('jwt', { session: false }), async (req, res) => {
   console.log('secret');
   res.json({secret: 'secret access!'});
});


module.exports = router;