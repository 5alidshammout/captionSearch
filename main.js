// the function name lol
function waitForIt() {
	return new Promise(resolve => {
		const observer = new MutationObserver(_ => {
			if (document.querySelector("#below")) {
				observer.disconnect();
				resolve(document.querySelector("#below"));
			};
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
};


waitForIt("#below").then(below => {
	const newdiv = document.createElement("div");

	newdiv.id = "captionSearchDiv";
	newdiv.style.cssText = `
		color: white;
		background-color: #33bbff;
		border-radius: 12px;
		margin: 12px 0px 12px 0px;
		padding: 16px;
	`;

	const heading = document.createElement("h1");
	heading.textContent = "Hello from wheatley!!!";

	newdiv.appendChild(heading);
	below.insertBefore(newdiv, below.firstChild);
	console.log(below);
});
