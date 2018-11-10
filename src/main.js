const {Instrument} = require('./instrument');

window.onload = function() {
  var instrument = new Instrument();
  attachHandlers(instrument, document.getElementById('slider'));
}

function attachHandlers(instrument, element) {
  let pauseTimeout = null;

  let mouseDown = false;
  element.addEventListener('mousedown', (event) => {
    const rect = element.getBoundingClientRect();
    const y = 1.0 - (event.y - rect.top) / element.clientHeight;
    const x = (event.x - rect.left) / element.clientWidth;
    instrument.play(y, x);

    mouseDown = true;
    clearTimeout(pauseTimeout);
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    pauseTimeout = setTimeout(() => instrument.pause(), 100)
  })

  element.addEventListener('mousemove', (event) => {
    if (mouseDown) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      instrument.play(y, x);
    }
  })
}
