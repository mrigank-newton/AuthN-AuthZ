const movie = getMovie(2, function(movie) {
                getDirectorForMovie(movie.name, function(director) {
                    getHitsForDirector(director.name, function(data) {
                        console.log(data.numberOfHits);
                    })
    })
});


//I have an API
//I call that API to get a movie details
//That director, how many hits he has given

function getMovie(id, callback) {
    setTimeout(() => {
        callback({id: id, name: 'Lagaan'});
    }, 1000);
    
    //return undefined
}

function getDirectorForMovie(movie, callback) {
    setTimeout(() => {
        callback({name: 'Ashutosh Gowarikar'});
    }, 1000)
}

function getHitsForDirector(director, callback) {
    setTimeout(() => {
        callback({director: director, numberOfHits: 4});
    }, 1000);
}