const notes = require('./notes');

class Background {
  constructor(ctx, freqs) {
    this.ctx = ctx;
    this.freqs = freqs;

    this.interval = null;
    this.iter = 0;

    this.volume = this.ctx.createGain();
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
    this.volume.connect(this.ctx.destination);

    this.osc = this.ctx.createOscillator();
    this.osc.type = 'square';
    this.osc.detune.setValueAtTime(1, this.ctx.currentTime);
    this.osc.connect(this.volume);
    this.osc.start()
  }

  play() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime);

        const freq = this.freqs[this.iter];
        this.osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        if (++this.iter >= this.freqs.length) {
          this.iter = 0;
        }
      }, 2000)
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;

    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
  }
}

module.exports = {
  Background: Background
}
