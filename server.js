var mosca = require('mosca')

var backend = {
	type: 'redis',
	redis: require('redis'),
	db: 12,
	port: 6379,
	return_buffers: true,
	host: '10.0.0.19'
};

var settings = {
	port: 1883,
	backend: backend,
	persistence: {
		factory: mosca.persistence.Redis,
		host: '10.0.0.19',
		port: 6379
	}
};

var server = new mosca.Server(settings);

function setup() {
	console.log('fucking mosca started');
}

server.on('ready', setup);

server.on('clientConnected', function(client){
	console.log('Client connected', client.id);
	var message = {
		topic: 'dafuq',
		payload: 'im fucking server',
		qos: 1,
		retain: true
	};
	server.publish(message, function(err){
		console.log('Published message to', client.id);
	});
});


server.on('published', function(packet, client) {
	console.log('Published', packet.payload);
});