let mouseEnabled = false;
let joyconsEnabled = true;

function attachMouseHandlers(instrument, element) {
  let pauseTimeout = null;

  let mouseDown = false;
  element.addEventListener('mousedown', (event) => {
    if (mouseEnabled) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      instrument.play(y, x);

      mouseDown = true;
    }
    clearTimeout(pauseTimeout);
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    pauseTimeout = setTimeout(() => instrument.pause(), 100)
  })

  element.addEventListener('mousemove', (event) => {
    if (mouseEnabled && mouseDown) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      instrument.play(y, x);
    }
  })
}

function attachJoyconHandlers(instrument) {
}

function toggleInputs() {
  mouseEnabled = !mouseEnabled;
  joyconsEnabled = !joyconsEnabled;
}

module.exports = {
  attachMouseHandlers: attachMouseHandlers,
  attachJoyconHandlers: attachJoyconHandlers,
  toggleInputs: toggleInputs
}
