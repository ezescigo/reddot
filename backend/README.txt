// terminal 1: npm run watch; 
// terminal 2: npm run dev

// Run DB
sudo -u postgres psql

createdb:
createdb nameDB

exit:
\q

// Restart Redis
sudo systemctl start redis-server

Third party libraries I use:

- Mikro-ORM
- TypeGraphql
- Argon2 (password hash)
- Redis (user session)