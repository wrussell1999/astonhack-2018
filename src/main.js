const {Instrument} = require('./instrument');

window.onload = function() {
  var instrument = new Instrument();
  attachHandlers(instrument, document);
}

function attachHandlers(instrument, element) {
  let pauseTimeout = null;

  let mouseDown = false;
  element.addEventListener('mousedown', (event) => {
    instrument.play(event.clientY);

    mouseDown = true;
    clearTimeout(pauseTimeout);
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    pauseTimeout = setTimeout(() => instrument.pause(), 100)
  })

  element.addEventListener('mousemove', (event) => {
    if (mouseDown) {
      instrument.play(event.y, event.x / document.body.clientWidth);
    }
  })
}
