# Modulo de Login

El objetivo de este modulo es no andar repitiendo siempre la autenticacion en NodeJs. Esta echo con JsonWebToken y Passport, y en un futuro podria implementarlo con cookies.

<b>Algunas notas respecto a JsonWebToken:</b>
- La funcion sign acepta un objeto que dentro va nuestro payload, luego una SecretOrKey que va ser nuestra clave unica codificada haciendo dificil que la puedan manipular, y por ultimo campos opcionales que puedo leer en la documentacion.
- iss (issuer) identifica el emisor del token. Es opcional y es sensible a minusculas y mayusculas. Puedo poner lo que quiera.
- sub (subject) es la parte central del token. Conecta al usuario con ese token. Por eso utilizo el _id, dado que el _id nunca va cambiar. Este campo es requerido, no puede ser opcional.
- iat (Issued At) identifica el momento que el token fue emitido. Su valor es numerico. Es opcional al igual que iss.
- exp (Expiration Time) es el tiempo que quiero que la token desaparezca. Se calcula desde el momento de la emisión. Opcional.

Esto se puede encontrar en esta documentacion: https://tools.ietf.org/html/rfc7519#section-4.1

Documentacion de jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken

<b>Funcion sign:</b>

JWT.sign({
  payload
}, 'secret', { expiresIn: '1h' });

Nota: Para hacer mas facil la autenticacion con jsonwebtoken voy utilizar passport.
