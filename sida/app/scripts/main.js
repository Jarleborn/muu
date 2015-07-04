console.log('\'Allo \'Allo!');

document.querySelector("#klick").addEventListener("click", function() {
	var xhr = new XMLHttpRequest();
xhr.open("POST", 'localhost:27017', true);
		console.log("skickar AJax");
		////////console.log(MG.id);
		xhr.send(

			JSON.stringify({
				text:document.querySelector("#putin").innerHTML
			})

		);
});