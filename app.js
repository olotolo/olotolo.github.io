const client = new tmi.Client({
	channels: [ 'olotolo_' ]
});

client.connect();
var links = [];

client.on('message', (channel, tags, message, self) => {
	if(self) return true;

	console.log(`${tags['display-name']}: ${message}`);
    if(message.startsWith("https://www.twitch.tv/")) {
		console.log("valid twitch clip");
		let myArray = message.split("/");
		let myString = myArray[5];
		myArray = myString.split("?");
		myString = myArray[0];


		var exists = false;
		for(var i = 0; i < links.length; i++) {
			if(links[i] == myString) {
				exists = true;
				return;
			}
		}

		if(!exists) {
			console.log(myString);
			links.push(myString);
		}
		

    } else {
		console.log("invalid twitch clip");
	}
});

function next() {
	if(links[0] != null) {
		var iframe = document.getElementById("clipiframe");
		iframe.clip = links[0];
		iframe.src = "https://clips.twitch.tv/embed?clip=" + links[0] + "&parent=olotolo.github.io&autoplay=true";
		links.shift();
	}
	console.log("list too short");
}



