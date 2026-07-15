const http = require('http');
const fs = require('fs');
const { on } = require('cluster');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("Welcom to Twitter")
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    var page = fs.readFileSync("index.html", "utf8");
    response.end(page);
    
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    fs.appendFileSync("hi_log.txt", "Somebody said hi.\n");
    response.end('Someone said hi')
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = [];
    request
    .on('data', chuck =>{
      body.push(chunk)
    })
    .on(end, () => {
      body = Buffer.concat(body).toString();

    })
  }
  else {
    // Handle 404 error: page not found
    // code here...
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
