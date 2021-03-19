const express = require('express');
const mongoose = require('mongoose');
const mentors = require('./routes/mentors');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');

const connectionString = 'mongodb+srv://mrigank94:GqtjZDKarka3wHps@todo.iwjw6.mongodb.net/mentos';

mongoose.connect(connectionString)
    .then(res => console.log('Connected to db successfully'))
    .catch(ex => console.log(ex));

const app = express();
app.use(express.json());

app.use('/', home);
app.use('/api/mentors', mentors);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(3001, () => console.log('Listening on port 3001.....'))

//app.get()
//app.post()
//app.put()
//app.delete()


/*
Application Development

Mocks -> Define collections -> Decide on APIs
*/