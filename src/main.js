window.onload = function() {
  var instrument = new Instrument('square');

  document.addEventListener('mousedown', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    instrument.play(y);

    console.log(x, y);
  })
}

class Instrument {
  constructor(waveType) {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = waveType;
    this.volume = this.ctx.createGain();

    this.oscillator.connect(this.volume);
    this.volume.connect(this.ctx.destination);

    // this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime);

    this.playing = false;
  }

  play(freq) {
    this.oscillator.frequency.setValueAtTime(freq, this.ctx.currentTime);

    if (!this.playing) {
      this.oscillator.start();
      this.playing = true;
    }
  }
}
