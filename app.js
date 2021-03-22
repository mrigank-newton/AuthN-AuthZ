const express = require('express');
const mongoose = require('mongoose');
const mentors = require('./routes/mentors');
const courses = require('./routes/courses');
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
app.use('/api/courses', courses);
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

Mocks -> Define collections -> Decide on APIs -> Develop APIs ->  Develop UI -> Integrate APIs with UI

POST /api/users --> SignUp --- DONE
POST /api/auth  --> Login --- DONE


Admin Form to create/update a course

Course Name
Topic
Start Date
End Date
Fees - 50 -> 40
Mentor
Mentees

Fees

POST /api/courses  --> Create a courses --- DONE
PUT /api/courses  --> Update a course --- DONE
GET  /api/topics  --> Get all the topics --- DONE
GET  /api/mentors  --> Get all the mentors --- DONE
GET  /api/mentees  --> Get all the mentees 

Admin Form to updating a mentor details (Mentor already signed up as a mentor)

Name
Topics (Multi select)
WorkEx


SignUp -> Mentor/Mentee -> User Collection
Admin is adding a mentor -> Mentor Collection


POST  /api/mentors  --> Updating the mentors --- DONE
DELETE  /api/mentors  --> Updating the mentors --- DONE
PUT  /api/mentors  --> Updating the mentors --- DONE


Mentor UI

GET /api/courses/mentor/:mentorId  --- DONE
GET /api/courses/:courseId   --- DONE
GET /api/courses/:courseId/sessions/:date?persona=mentor ---DONE
POST /api/courses/:courseId/sessions/:date --- DONE


/api/courses/:id

/api/courses/topics  => req.params.id = topics


Mentee UI

GET /api/courses/mentee/:menteeId  - DONE
GET /api/courses     - DONE
GET /api/courses/:courseId    - DONE
PUT /api/course/:courseId/mentee/:menteeId/subscribe  --> Update a course with subscription -- DONE
GET /api/courses/:courseId/sessions/:date?persona=mentee  DONE
*/