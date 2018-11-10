window.onload = function() {
  var instrument = new Instrument();

  let mouseDown = false;
  document.addEventListener('mousedown', (event) => {
    mouseDown = true;
  })
  document.addEventListener('mouseup', (event) => {
    mouseDown = false;
  })

  document.addEventListener('mousemove', (event) => {
    if (mouseDown) {
      instrument.play(event.clientY);
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

    this.playing = null;
  }

  play(freq) {
    // this smooths out the sounds
    const delay = 0.05;

    for (let osc of this.oscillators) {
      osc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);

      this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime + delay);
    }

    if (this.playing) {
      clearTimeout(this.playing);
    }

    this.playing = setTimeout(() => {
      this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
      this.playing = null;
    }, 100);
  }
}
