const client = new tmi.Client({
	channels: [ 'olotolo_' ]
});

client.connect();

let links = {};

client.on('message', (channel, tags, message, self) => {
	if(self) return true;

	console.log(`${tags['display-name']}: ${message}`);
    if(message.startsWith("")) {

    }
});