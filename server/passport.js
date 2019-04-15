/**
 * Passport utiliza distintas estrategias. Una de ellas puede ser LocalStrategy (autenticacion local) o JwtStrategy (autenticacion por jwt). Lo primero hay que configurar passport en cada estrategia. En la de JWT toma un objeto con dos valores, el primero es de donde viene el token, es decir tengo que usar el ExtractJwt y extraerlo del header. ExtractJwt.fromHeader('authorization'), y lo segundo vendria ser nuestro secretOrKey. Luego de esto ejecuta una funcion con un payload y done. EL payload de esta funcion representa los datos que le mando por la funcion sign.
 */

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
 }))