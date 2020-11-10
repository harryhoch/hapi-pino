//based on  code here: https://github.com/dwyl/learn-hapi
//npm init -y && npm install hapi --save


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
      request.logger.warn('In handler %s', request.path)

      return 'hello world'
    }
  })

 server.route({
     method: 'GET',
     path: '/hello/{name}',
     handler: async function(request, h) {
	 request.logger.info('In handler ', request.path)
	 return 'hello'+request.params.name
    }
 })

  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: process.env.NODE_ENV !== 'production',
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization']
    }
  })

  // also as a decorated API
  //server.logger.info('another way for accessing it')

  // and through Hapi standard logging system
  //server.log(['subsystem'], 'third way for accessing it')

  await server.start()

  return server
}

start().catch((err) => {
  console.log(err)
  process.exit(1)
})
