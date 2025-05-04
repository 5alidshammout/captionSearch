// the function name lol
function waitForIt(query) {
	return new Promise(resolve => {
		const observer = new MutationObserver(_ => {
			if (document.querySelector(query)) {
				observer.disconnect();
				resolve(document.querySelector(query));
			};
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
};

function init(below) {
	const newdiv = document.createElement("div");

	newdiv.id = "captionSearchDiv";
	newdiv.style.cssText = `
		color: white;
		background-color: #33bbff;
		border-radius: 12px;
		margin: 12px 0px 12px 0px;
		padding: 16px;
	`;
	below.insertBefore(newdiv, below.firstChild);
}

function update(event) {
	const data = event.data;
	if (data.source === "captionSearchExtension" && data.response) {
		const captions = data.response.captions.playerCaptionsTracklistRenderer;

		waitForIt("#captionSearchDiv").then(newdiv => {
			if (newdiv.firstChild) {
				newdiv.innerHTML = ''
				const heading = document.createElement("h1");
				heading.innerText = captions.captionTracks.map(x => x.vssId).join(" | ")
				newdiv.appendChild(heading);
			} else {
				const heading = document.createElement("h1");
				heading.innerText = captions.captionTracks.map(x => x.vssId).join(" | ")
				newdiv.appendChild(heading);
			}
		});
	}
}

function parseCaptions() {
	const script = document.createElement("script");
	script.textContent = `(_=>{window.postMessage({source: "captionSearchExtension", response: window.ytInitialPlayerResponse},"*")})()`;
	(document.head || document.documentElement).appendChild(script);
	script.remove();
}

let url = window.location.href;
if (window.location.href.includes("watch?v=")) {
	console.log(url, window.location.href)
	if (window.location.href !== url) {
		url = window.location.href;
		location.reload();
	}
	console.log(window.ytInitialPlayerResponse)
	waitForIt("#below").then(below => {
		init(below)
		parseCaptions()
		window.addEventListener(
			"message",
			(event) => {
				update(event)
			},
		);
	});
}
