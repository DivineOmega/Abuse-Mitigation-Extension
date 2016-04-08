
function getBadWords() {

	return ['sex'];

}

function performHide() {

	var tweets = document.getElementsByClassName('tweet');

	for(var i = 0; i < tweets.length; i++) {
		var tweet = tweets[i];

		var texts = tweet.getElementsByClassName('tweet-text');

		if (texts.length === 0) {
			continue;
		}

		var text = texts[0];
		var textContent = text.textContent.toLowerCase();

		var badWords = getBadWords();

		for(var j = 0; j < badWords.length; j++) {

			var badWord = badWords[j].toLowerCase();

			if (new RegExp("\\b"+badWord+"\\b").test(textContent)) {
				tweet.remove();
				break;
			}
		}

	}

}

setInterval(function(){ performHide(); }, 250);
