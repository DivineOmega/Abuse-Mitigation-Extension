
  function updatePopupUI() {
    chrome.storage.local.get('tweetsRemoved', function(response) {
      document.getElementById('tweetsRemoved').innerHTML = response.tweetsRemoved;
    });
  }


document.addEventListener('DOMContentLoaded', function() { updatePopupUI(); }, false);

setInterval(function(){ updatePopupUI(); }, 1000);
