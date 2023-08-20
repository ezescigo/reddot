// terminal 1: npm run watch; 
// terminal 2: npm run dev

// Run DB
sudo -u postgres psql

createdb:
createdb nameDB

exit:
\q

Third party libraries I use:

- Mikro-ORM
- TypeGraphql
- Argon2 (password hash)
- Redis (user session)