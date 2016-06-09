var mosca = require('mosca')

var mosca_port = 1883;
var redis_port = 6379;
var redis_host = '10.0.0.19';

var backend = {
	type: 'redis',
	redis: require('redis'),
	db: 12,
	port: redis_port,
	return_buffers: true,
	host: redis_host
};

var settings = {
	port: mosca_port,
	backend: backend,
	persistence: {
		factory: mosca.persistence.Redis,
		host: redis_host,
		port: redis_port
	}
};

var server = new mosca.Server(settings);

function setup() {
	console.log('Mosca started on ', mosca_port);
}

//mosca server is ready
server.on('ready', setup);

//when a client connects
server.on('clientConnected', function(client){
	console.log('Client connected', client.id);
});

//when a message is published
server.on('published', function(packet, client) {
	console.log('Published', packet.payload.toString());
});

//when a client disconnects
server.on('clientDisconnected', function(client) {
	console.log('Client disconnected:', client.id);
})

//when a client subscribes
server.on('subscribed', function(topic, client) {
	console.log('Client subscribed topic:', topic, client.id);
})

//when a client unsubcribes
server.on('unsubcribed', function(topic, client){
	console.log('Client unsubcribed topic:', topic, client.id);
})