const express = require('express');
const morgan = require('morgan');
const app = express();

/** Config */
require('./database');
require('./passport');

/** Middleware */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
app.use('/api/users', require('./routes/users'));

/** Server */
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
   console.log(`Server conectado en el puerto ${app.get('port')}`);
});