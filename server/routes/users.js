const express = require('express');
const router = express.Router();



/** Registro */
router.post('/signUp', async (req, res) => {
   console.log('signUp call!');
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