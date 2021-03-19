function getMentor(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: 2, name: 'Shilpa'})
        }, 1000)
    });
}

//if a function returns a promise, u can call .then on the result of that function.
//When the result is available, .then will be executed

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


getMentor()
    .then(mentor => getMentee(mentor.name))
    .then(mentee => getScore(mentee.name))
    .then(data => console.log(data.score))
    .catch(ex => console.log(ex));
//Given a id, u want to get a mentor


