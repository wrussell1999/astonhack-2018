let mouseEnabled = false;
let joyconsEnabled = true;

function attachMouseHandlers(instrument, element) {
  let mouseDown = false;
  element.addEventListener('mousedown', (event) => {
    if (mouseEnabled) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      instrument.play(y, x);

      mouseDown = true;
    }
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    instrument.pause();
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
  let interval = null;

  window.addEventListener('gamepadconnected', (event) => {
    let gp = event.gamepad;
    // if (gp.id.endsWith('-MotionLeft') || gp.id.endsWith('-MotionRight')) {
    if (gp.id.endsWith('-MotionLeft')) {
      interval = setInterval(() => {
        let pressed = false;
        for (let i = 0; i < gp.buttons.length; i++) {
          if (gp.buttons[i].pressed) {
            pressed = true;
            break;
          }
        }
        if (joyconsEnabled) {
          if (pressed) {
            let y = (gp.axes[gp.axes.length - 1] + 1) / 2;
            let x = (gp.axes[gp.axes.length - 2] + 1) / 2;
            instrument.play(y, x);
          } else {
            instrument.pause();
          }
        }
      })
    }
  })

  window.addEventListener('gamepaddisconnected', (event) => {
    clearInterval(interval);
  })
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
