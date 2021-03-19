
async function logScore() {
    const mentor = await getMentor(2);
    const mentee = await getMentee(mentor.name);
    const data = await getScore(mentee.name);
    console.log(data.score);
}

logScore();

function getMentor(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: 2, name: 'Shilpa'})
        }, 1000)
    });
}

function getMentee(mentorName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: 5, name: 'Mrigank'})
        }, 1000)
    });
}

function getScore(menteeName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: 5, score: 100})
        }, 1000)
    });
}


// getMentor()
//     .then(mentor => getMentee(mentor.name))
//     .then(mentee => getScore(mentee.name))
//     .then(data => console.log(data.score))
//     .catch(ex => console.log(ex));

// getMentor(2, function(mentor) {
//     //we want this line of code to get executed after result of api call is avilable
//     //mentor = {id: 2, name: Shashank}
//     getMentee(mentor.name, function(mentee) {
//         //mentee {id: 5, mentorName: mentorName, name: 'Mrigank'}
//         getScore(mentee.name, function(data) {
//             console.log(data.score);
//         })
//     }) 
// })
