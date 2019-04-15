const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
require('dotenv').config();

/** Models */
const User = require('../models/User');

/**
 * La funcion sign acepta un objeto que dentro va nuestro payload, luego una SecretOrKey que va ser nuestra clave unica codificada haciendo dificil que la puedan manipular, y por ultimo campos opcionales que puedo leer en la documentacion.
 * el iss (issuer) identifica el emisor del token. Es opcional y es sensible a minusculas y mayusculas. Puedo poner lo que quiera.
 * el sub (subject) es la parte central del token. Conecta al usuario con ese token. Por eso utilizo el _id, dado que el _id nunca va cambiar. Este campo es requerido, no puede ser opcional.
 * el iat (Issued At) identifica el momento que el token fue emitido. Su valor es numerico. Es opcional al igual que iss.
 * el exp (Expiration Time) es el tiempo que quiero que la token desaparezca. Se calcula desde el momento de la emisión. Opcional.
*/

signToken = user => {
   return JWT.sign({
      iss: 'loginExample',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1) //el dia actual + 1
   }, 'authenticationExample')
}

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

   const token = signToken(newUser);
   //Si esta todo ok, respondo con el token
   res.status(200).json({ token });
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