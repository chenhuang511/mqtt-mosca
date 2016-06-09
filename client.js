var mqtt = require('mqtt')
var client = mqtt.connect({
	host: 'localhost',
	port: 1883,
    clientId: 'client_01'
});

client.on('connect', function() {
	client.subscribe('presence');
	client.publish('presence', '1', {qos:1});
});

client.on('message', function(topic, message) {
	console.log(message.toString(), topic.toString());
	client.end();
});