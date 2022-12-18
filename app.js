const client = new tmi.Client({
	channels: [ 'olotolo_' ]
});

client.connect();
var links = [];
var watched = [];

client.on('message', (channel, tags, message, self) => {
	if(self) return true;
	// Check if the link is from twitch
    if(message.startsWith("https://www.twitch.tv/")) {
		console.log("valid twitch clip");
		let myArray = message.split("/");
		let myString = myArray[5];
		myArray = myString.split("?");
		myString = myArray[0];

		// Only 100 Clips in queue max
		if(links.length > 100) {
			return;
		}

		// Check if the clip is currently in the queue
		var exists = false;
		for(var i = 0; i < links.length; i++) {
			if(links[i] == myString) {
				exists = true;
				return;
			}
		}
		// Check if the clip has recently been watched
		for(var i = 0; i < links.length; i++) {
			if(watched[i] == myString) {
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
		watched.push(links[0]);
		links.shift();
		if(watched > 100) {
			watched.push();
		}
	}
	console.log("list too short");
}

setInterval(test, 1000);
//   https://clips.twitch.tv/embed?clip=TangentialTsundereTapirCoolCat-dM7O8oCunwGFiKmu&parent=olotolo.github.io&autoplay=true
function test() {
	
}

let curr_clip = document.createElement('video');
curr_clip.addEventListener("ended", nextClip);

function nextClip() {
	console.log("play next clip");
}