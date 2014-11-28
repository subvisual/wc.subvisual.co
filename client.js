var source = new EventSource("/updates");

source.addEventListener('message', function(e) {
  document.getElementsByTagName('body')[0].className = e.data;
}, false);
