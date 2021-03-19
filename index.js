const http = require('http');

const mentors = [{
    id: 1,
    name: 'Sudharshan',
    topics: ['React', 'NodeJS']
}];

const server= http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Connection to mentos successful !');
        res.end();
    }   
    
    if(req.url === '/api/mentors') {
        res.write(JSON.stringify(mentors));
        res.end();
    }
    
})


server.listen(3000);