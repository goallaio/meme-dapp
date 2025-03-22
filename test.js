const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainPassword = 'tl78B@F9&A5Jr#';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  console.log('Encrypted password for .env file:', hash);
});