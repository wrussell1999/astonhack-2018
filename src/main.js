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
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);

    this.oscillator.connect(this.volume);
    this.volume.connect(this.ctx.destination);

    this.oscillator.start();

    this.playing = null;
  }

  play(freq) {
    this.oscillator.frequency.setValueAtTime(freq, this.ctx.currentTime);
    this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime);

    if (this.playing) {
      clearTimeout(this.playing);
    }

    this.playing = setTimeout(() => {
      this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
      this.playing = null;
    }, 2000);
  }
}
