var source = new EventSource("/updates");

source.addEventListener('message', function(e) {
  document.getElementsByTagName('body')[0].className = e.data;
  document.getElementsByTagName('title')[0].innerHTML = e.data + " - GB WC Occupancy Calculator™";
}, false);
