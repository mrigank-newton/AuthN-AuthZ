//Mentor id
//Mentees
//Score of the highest rated mentee

//getMentor
//getMentee given a mentor name
//getScore given a mentee name

let mentorId = 2;


getMentor(2, function(mentor) {
    console.log(mentor)
})
//Callback hell
//Christmas tree problem
getMentor(2, function(mentor) {
    //we want this line of code to get executed after result of api call is avilable
    //mentor = {id: 2, name: Shashank}
    getMentee(mentor.name, function(mentee) {
        //mentee {id: 5, mentorName: mentorName, name: 'Mrigank'}
        getScore(mentee.name, function(data) {
            console.log(data.score);
        })
    }) 
})

function getMentor(id, callback) {
    setTimeout(() => {
        callback({id: id, name: 'Shashank'});
    }, 1000)
}

function getMentee(mentorName, callback) {
    setTimeout(() => {
        callback({id: 5, mentorName: mentorName, name: 'Mrigank'});
    }, 1000)
}


function getScore(menteeName, callback) {
    setTimeout(() => {
        callback({id: 5, score: 90, name: menteeName});
    }, 1000)
}