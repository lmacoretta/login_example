const express = require('express');
const router = express.Router();

/** Models */
const User = require('../models/User');

/** Registro */
router.post('/signUp', async (req, res) => {
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

   //Si esta todo ok, respondo con el token
   res.status(200).json({user: 'El usuario ha sido creado con exito'});
});


/** Logeo */
router.post('/signIn', async (req, res) => {
   console.log('signIn call');
});


/** Secret */
router.get('/secret', async (req, res) => {
   console.log('secret');
});


module.exports = router;