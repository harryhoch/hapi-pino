//based on  code here: https://github.com/dwyl/learn-hapi
//npm init -y && npm install hapi --save
// npm install hapi-pino

const Hapi = require('@hapi/hapi');
async function start () {
  // Create a server with a host and port
  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    debug: false, // disable Hapi debug console logging
  })

    
  // Add the route
  server.route({
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
      // request.log is HAPI standard way of logging
      // you can also use a pino instance, which will be faster
     //request.logger.warn('In handler %s', request.path)
     request.log(['a', 'b'], 'Request into hello world')

      return 'hello world'
    }
  })

 server.route({
     method: 'GET',
     path: '/hello/{name}',
     handler: async function(request, h) {
	// request.logger.info('In handler ', request.path)
	 logdata = [ { 'name': request.params.name}]
	 request.log(logdata,'requesting hello')
	 return 'hello'+request.params.name
    }
 })

 server.route({ 
     method: 'GET',
     path: '/patient/{patientId}/{reportId}',
     handler: async function(request,h) {
	 logdata = [{'patientId': request.params.patientId, 'reportId': request.params.reportId}]
	 request.log(logdata,'requesting patient')
	 return 'requesting patient id.'  
     }
})


  await server.register({
    plugin: require('hapi-pino'),
    options: {
       ///return 
      //prettyPrint: process.env.NODE_ENV !== 'production',
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization','req.headers']
    }
  })

  // also as a decorated API
  server.logger.info('another way for accessing it')
     
  const child = server.logger.child({a:'property'})

    //and through Hapi standard logging system
  server.log(['subsystem'], 'third way for accessing it')

  child.info('foo')

  await server.start()

  return server
}

start().catch((err) => {
  console.log(err)
  process.exit(1)
})
