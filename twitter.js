var badWords = [];
var tweetsRemoved = 0;
var numberOfTweetsOnPage = 0;

function performHide() {

	var tweets = document.getElementsByClassName('tweet');

	if (numberOfTweetsOnPage == tweets.length) {
		setTimeout(function(){ performHide(); }, 100);
		return;
	} else {
		numberOfTweetsOnPage = tweets.length;
	}

	var tweet;

	for(var k = 0; k < tweets.length; k++) {
		tweet = tweets[k];

		var texts = tweet.getElementsByClassName('tweet-text');

		if (texts.length === 0) {
			continue;
		}

		var text = texts[0];
		var textContent = text.textContent.toLowerCase();

		var removeTweet = false;

		for(var j = 0; j < badWords.length; j++) {

			var badWord = badWords[j].toLowerCase();

			if (textContent.indexOf(badWord) == -1 ) {
				continue;
			}

			if (new RegExp("\\b"+badWord+"\\b").test(textContent)) {
				removeTweet = true;
				console.log(badWord);
				break;
			}
		}

		if (removeTweet) {
			tweetsRemoved++;
		} else {
			tweet.style.display = 'block';
		}

	}

	chrome.storage.local.set({'tweetsRemoved': tweetsRemoved});

	var spinnerElements = document.getElementsByClassName('spinner');
	if (typeof spinnerElements != 'undefined' && spinnerElements.length > 1) {
		spinnerElements[0].remove();
	}

	setTimeout(function(){ performHide(); }, 100);


}

chrome.storage.local.get('badWords', function(response) {

	if (typeof response.badWords != 'undefined' && response.badWords.length > 0) {
		badWords = response.badWords;
	}

});

performHide();
