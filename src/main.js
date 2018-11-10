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
      instrument.play(event.y);
    }
  })
}

class Instrument {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.volume = this.ctx.createGain();
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
    this.volume.connect(this.ctx.destination);

    this.oscillators = [];
    
    let oscillator = this.ctx.createOscillator();
    oscillator.type = 'sine';
    this.oscillators.push(oscillator);

    let oscillator2 = this.ctx.createOscillator();
    oscillator2.type = 'sawtooth';
    oscillator2.detune.setValueAtTime(0, 10);
    this.oscillators.push(oscillator2);

    for (let osc of this.oscillators) {
      osc.start();
      osc.connect(this.volume);
    }
  }

  play(freq) {
    // this smooths out the sounds
    const delay = 0.05;

    for (let osc of this.oscillators) {
      osc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);

      this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime + delay);
    }
  }

  pause() {
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
  }
}
