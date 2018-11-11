const notes = require('./notes');

class Instrument {
  constructor(ctx, generator) {
    this.ctx = ctx;

    this.generator = generator;

    this.volume = this.ctx.createGain();
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
    this.volume.connect(this.ctx.destination);

    this.leftGain = this.ctx.createGain();
    this.leftGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.leftGain.connect(this.volume);
    this.left = this.ctx.createOscillator();
    this.left.type = 'square';
    this.left.connect(this.leftGain);
    this.left.start()

    this.harmonicVolume = this.ctx.createGain();
    this.harmonicVolume.gain.setValueAtTime(1.3, this.ctx.currentTime);
    this.harmonicVolume.connect(this.volume);
    this.harmonic = this.ctx.createOscillator();
    this.harmonic.type = 'sine';
    this.harmonic.connect(this.harmonicVolume);
    this.harmonic.start();

    this.rightGain = this.ctx.createGain();
    this.rightGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.rightGain.connect(this.volume);
    this.right = this.ctx.createOscillator();
    this.right.type = 'sawtooth';
    this.right.connect(this.rightGain);
    this.right.start()

    this.onplay = null;
    this.onpause = null;
  }

  play(pitch, pan) {
    const freq = this.generator(pitch);

    // this smooths out the sounds
    const delay = 0.05;

    this.left.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);
    this.right.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);
    this.harmonic.frequency.linearRampToValueAtTime(freq * 2, this.ctx.currentTime + delay);

    this.leftGain.gain.linearRampToValueAtTime(1.0 - pan, this.ctx.currentTime + delay);
    this.rightGain.gain.linearRampToValueAtTime(pan, this.ctx.currentTime + delay);

    // this.volume.gain.setValueAtTime(0.1, this.ctx.currentTime + delay);
    if (this.volume.gain.value == 0) {
      this.volume.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + delay + 0.1);
    }

    if (this.onplay) {
      this.onplay(freq);
    }
  }

  pause() {
    // this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
    if (this.volume.gain.value > 0.1) {
      this.volume.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    }

    if (this.onpause) {
      this.onpause();
    }
  }
}

module.exports = {
  Instrument: Instrument
}
