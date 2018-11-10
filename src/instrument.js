class Instrument {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.volume = this.ctx.createGain();
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
    this.volume.connect(this.ctx.destination);

    this.leftGain = this.ctx.createGain();
    this.leftGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.leftGain.connect(this.volume);
    this.left = this.ctx.createOscillator();
    this.left.type = 'sine';
    this.left.connect(this.leftGain);
    this.left.start()

    this.rightGain = this.ctx.createGain();
    this.rightGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.rightGain.connect(this.volume);
    this.right = this.ctx.createOscillator();
    this.right.type = 'sawtooth';
    this.right.connect(this.rightGain);
    this.right.start()
  }

  play(freq, pan = 0.5) {
    // this smooths out the sounds
    const delay = 0.05;

    this.left.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);
    this.right.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + delay);

    this.leftGain.gain.linearRampToValueAtTime(pan, this.ctx.currentTime + delay);
    this.rightGain.gain.linearRampToValueAtTime(1.0 - pan, this.ctx.currentTime + delay);

    this.volume.gain.setValueAtTime(0.2, this.ctx.currentTime + delay);
  }

  pause() {
    this.volume.gain.setValueAtTime(0, this.ctx.currentTime);
  }
}

module.exports = {
  Instrument: Instrument
}
