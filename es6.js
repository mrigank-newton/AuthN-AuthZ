let obj = {
    firstName: 'Mrigank',
    lastName: 'Kaushik',
    age: 26,
    isMarried: false
};

console.log(Object.keys(obj));

//for in loop
for(let key in obj) {
    console.log(key);
}

//for of loop

//Iterables => array like
//Array, string, set, arguments

//Array Like means that these have properties indexed from 0, length property
//But  they dont have the array methods like map, forEach

//This
//Arrow Function
//Rest  Spread
//Template  Literals
//Let, const vs var
//Hoisting
//Iterables
//For of
//Destructuring
//Default params

let str= [1,2,3,4,5];

for(let c of str) {
    console.log(c);
}


function sum() {
    //arguments
    console.log(arguments[0], arguments[1], arguments[2], arguments.length);
}

sum(1,2,3);


