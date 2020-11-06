//based on  code here: https://github.com/dwyl/learn-hapi
//npm init -y && npm install hapi --save


const Hapi = require('hapi');
const server = new Hapi.Server({port: 3000}); // tell hapi which TCP Port to "listen" on

server.route({
	method: 'GET',        // define the method this route will handle
	path: '/{yourname*}', // this is how you capture route parameters in Hapi
	handler: function(req, h) { // request handler method
	    req.log('info','hello '+req.params.yourname);
		return 'Hello ' + req.params.yourname + '!'; // reply with text.
	}
});

server.route({
    method: 'GET',
    path:  '/goodbye/{yourname*}',
    handler: function(req,h) {
	req.log('info','goodbye '+req.params.yourname);
        return 'Goodbye '+req.params.yourname+'!';
    }
});

async function startServer() {
  await server.start() // start the Hapi server on your localhost
  console.log('Now Visit: http://localhost:' + server.info.port + '/YOURNAME');
}

startServer();

module.exports = server;
