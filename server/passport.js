const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/User');

/** JsonWebToken Strategy */
passport.use(new JwtStrategy({
jwtFromRequest: ExtractJwt.fromHeader('authorization'), //Esto es de donde viene la informacion.
secretOrKey: 'authenticationExample'
}, async (payload, done) => {
try {
   const user = await User.findById(payload.sub); //Payload.sub viene de la funcion sign. Trae el id del usuario.

   if (!user) {
      return done(null, false);
   }

   done(null, user);

} catch (err) {
   done(err, false);
}
}));

/** Local Strategy */
passport.use(new LocalStrategy({
   usernameField: 'email' //La autenticacion local por defecto utiliza el nombre de usuario para logear, yo lo cambio al mail.
}, async (email, password, done) => {
   try {
   const user = await User.findOne({ email });

   if (!user) {
      return done(null, false);
   }

   const isMatch = await user.isValidPassword(password);

   //Si la password no es correcta, out.
   if (!isMatch) {
      return done(null, false);
   }

   //Si todo esta bien, in.
   done(null, user);
   
   } catch (err) {
   done(err, false);
   }
}));