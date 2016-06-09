var mqtt = require('mqtt')
var client = mqtt.connect({
	host: 'localhost',
	port: 1883,
    clientId: 'client_02'
});

client.on('connect', function() {
	client.subscribe('presence', {qos:1});
});

client.on('message', function(topic, message) {
	console.log(message.toString(), topic.toString());
	client.end();
});