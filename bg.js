
function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);
 }

function addWordsToStorage(words) {
  chrome.storage.local.get('badWords', function(response) {
     var badWords = response.badWords;
     if (typeof badWords == 'undefined') {
       badWords = [];
     }
     for (var j = 0; j < words.length; j++) {
       var word = words[j];
       badWords.push(word);
     }
     chrome.storage.local.set({'badWords': badWords});
  });
}

function updateBadWordsFromList(list) {

	loadJSON('lists/'+list.filename, function(words) {

		addWordsToStorage(words);

	});

}

function setDefaultBadWords(callback) {

	loadJSON('lists/index.json', function(lists) {

		for (var i = 0; i < lists.length; i++) {
			var list = lists[i];
			if (list.enabledByDefault) {
				updateBadWordsFromList(list);
			}
		}

	});

}

chrome.storage.local.get('badWords', function(response) {
  if (typeof response.badwords == 'undefined') {
    setDefaultBadWords();
  }
});
