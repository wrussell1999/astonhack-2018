const {Instrument} = require('./instrument');
const {attachHandlers} = require('./handlers');

window.onload = function() {
  var instrument = new Instrument();
  attachHandlers(instrument, document.getElementById('slider'));
}
