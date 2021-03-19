
// const topics = [{
//     name: 'Angular',
//     tag: 'frontend'
// },{
//     name: 'React',
//     tag: 'frontend'
// },{
//     name: 'Vue',
//     tag: 'frontend'
// },{
//     name: 'NodeJS',
//     tag: 'backend'
// },{
//     name: 'Java',
//     tag: 'backend'
// }];

// for(let i=0; i<100; i++) {
//     let mentorObj = {};

//     mentorObj.name = humanNames.allRandom();
//     mentorObj.topics = [];
//     mentorObj.tags = [];

//     while(mentorObj.topics.length < 2) {
//         let index = Math.floor(Math.random() * topics.length);

//         if(mentorObj.topics.indexOf(topics[index].name) !== -1) {
//             continue;
//         }

//         mentorObj.topics.push(topics[index].name);

//         if(mentorObj.tags.length === 0 || mentorObj.tags.indexOf(topics[index].tag) === -1) {
//              mentorObj.tags.push(topics[index].tag);
//         }
//     }

//     mentorObj.rating = (Math.random() * 5).toFixed(2);
//     mentorObj.numberOfMentees = Math.floor(Math.random() * 20)
//     mentorObj.fees = 20 + Math.floor(Math.random() * 30);
//     mentorObj.isFull = Math.floor(Math.random() * 7) % 3 ? true : false;

//     const mentor = new Mentor(mentorObj);
//     mentor.save().then(data => console.log(data));
// }
