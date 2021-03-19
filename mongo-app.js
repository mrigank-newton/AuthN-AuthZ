const mongoose = require('mongoose');
const humanNames = require('human-names');

const connectionString = 'mongodb+srv://mrigank94:GqtjZDKarka3wHps@todo.iwjw6.mongodb.net/mentos';

mongoose.connect(connectionString)
    .then(res => console.log('Connected to db successfully'))
    .catch(ex => console.log(ex));

const mentorSchema = new mongoose.Schema({
    name: String,
    isFull: {
        type: Boolean,
        default: false
    },
    fees: Number,
    topics: [ String ],
    tags: [String],
    joiningDate: {
        type: Date,
        default: Date.now
    },
    numberOfMentees: Number,
    rating: Number
});

const Mentor = mongoose.model('mentor', mentorSchema);


async function getMentor() {
    const mentorResponse =
    await Mentor.find({rating: {$lt: 1}}).select({name: 1, rating: 1, numberOfMentees: 1, fees: 1});
    console.log(mentorResponse);
}

async function updateMentor(id, name) {
    const mentor = await Mentor.findById(id);
    mentor.name = name;

    const updatedMentor = await mentor.save()
    console.log(updatedMentor);
}

async function updateMentorByFees(fees) {
    const mentors = await Mentor.find({fees: {$lt: fees}});

    for(let i=0; i<mentors.length; i++) {
        mentors[i].fees = fees;
        await mentors[i].save();
    }
}


async function deleteMentor(id) {
    const deletedMentor = await Mentor.findByIdAndDelete(id);
    console.log(deletedMentor);
}


async function deleteMentorsWithRatingLessThan(rating) {
    const deletedMentors = await Mentor.deleteMany({rating: {$lt: rating}});
    console.log(deletedMentors);
}

//if pageSize=100
//page 1 => 0
//page 2 => 101-200
//page 3 => 201-300
async function getPaginatedMentors(pageNumber, pageSize=100) {
    const mentors = await Mentor
                            .find()
                            .skip((pageNumber - 1) * pageSize)
                            .limit(pageSize)
                            .sort({name: 1});
    
                            console.log(mentors);
}


getPaginatedMentors(1);


//deleteMentorsWithRatingLessThan(1);
//deleteMentor('604cc2c5d9c3ec51a016ad04')

// updateMentorByFees(25);

//gt
//gte
//lt
//lte
//eq
//ne
//in
//nin

// I want to find all mentors whose rating is greater than 4 or their fees is less than 30
//getMentor();




