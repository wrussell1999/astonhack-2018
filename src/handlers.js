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

  let drumSounded = false;

  interval = setInterval(() => {
    let controller =  navigator.getGamepads()[0];
    let enableThero = false;
    let altDrum = false;

    if(controller.buttons[6].pressed) {
      enableThero = true;
    }

    if (controller.buttons[7].pressed) {
      altDrum = true;
    }

    if (joyconsEnabled) {
      if (enableThero) {
        let y = (controller.axes[2] + 1) / 2;
        let x = (controller.axes[3] + 1) / 2;
        sounds.main.play(y, x);
      } else {
        sounds.main.pause();
      }

      
      if (!drumSounded && controller.axes[controller.axes.length - 2] == 1) {
        drumSounded = true;
        if (altDrum) {
          sounds.hihat();
        } else {
          sounds.drum();
        }
      } else if (controller.axes[controller.axes.length - 2] < 0.5) {
        drumSounded = false;
      }
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
