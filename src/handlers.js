let mouseEnabled = false;
let joyconsEnabled = true;

function attachMouseHandlers(sounds, element) {
  let mouseDown = false;
  element.addEventListener('mousedown', (event) => {
    if (mouseEnabled) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      sounds.main.play(y, x);

      mouseDown = true;
    }
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    sounds.main.pause();
  })

  element.addEventListener('mousemove', (event) => {
    if (mouseEnabled && mouseDown) {
      const rect = element.getBoundingClientRect();
      const y = 1.0 - (event.y - rect.top) / element.clientHeight;
      const x = (event.x - rect.left) / element.clientWidth;
      sounds.main.play(y, x);
    }
  })

  document.addEventListener('keypress', (event) => {
    if (mouseEnabled) {
      if (event.code == 'Space') {
        sounds.drum();
      } else if (event.code == 'Enter') {
        sounds.hihat();
      }
    }
  })
}

function attachJoyconHandlers(sounds) {
  let interval = null;

  window.addEventListener('gamepadconnected', (event) => {
    let gp = event.gamepad;
    if (gp.id.endsWith('-MotionLeft')) {
      let drumSounded = false;

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
            let y = (gp.axes[2] + 1) / 2;
            let x = (gp.axes[3] + 1) / 2;
            sounds.main.play(y, x);
          } else {
            sounds.main.pause();
          }

          /*
          if (!drumSounded && gp.axes[gp.axes.length - 1] == 1) {
            drumSounded = true;
            sounds.drum()
          }
          */
        }
      })
    /*
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
            sounds.main.play(y, x);
          } else {
            sounds.main.pause();
          }
        }
      })
    } else if (gp.id.endsWith('-MotionRight')) {
      let drumSounded = false;
      interval = setInterval(() => {
        if (joyconsEnabled) {
          if (!drumSounded && gp.axes[gp.axes.length - 1] == 1) {
            drumSounded = true;
            let pressed = false;
            for (let i = 0; i < gp.buttons.length; i++) {
              if (gp.buttons[i].pressed) {
                pressed = true;
                break;
              }
            }

            if (pressed) {
              sounds.hihat();
            } else {
              sounds.drum();
            }
          } else if (drumSounded && gp.axes[gp.axes.length - 1] != 1) {
            drumSounded = false;
          }
        }
      })
      */
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
