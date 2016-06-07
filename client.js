var mqtt = require('mqtt')
var client = mqtt.connect('mtqq://localhost:1883');

client.on('connect', function() {
	// client.subscribe('presence');
	client.publish('presence', 'im client 1', {qos: 1});
});

client.on('message', function(topic, message) {
	console.log(message.toString(), topic.toString());
	// client.end();
});