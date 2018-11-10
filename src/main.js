const {Instrument} = require('./instrument');
const {attachHandlers} = require('./handlers');

const notes = require('./notes');

window.onload = function() {
  var instrument = new Instrument(majorPentatonicScale);
  attachHandlers(instrument, document.getElementById('slider'));
}

function majorPentatonicScale(pitch) {
  const base = 49;
  const majorScale = [base, base + 2, base + 4, base + 7, base + 9];

  const note = majorScale[Math.floor(pitch * majorScale.length)];
  return notes.noteToFrequency(note);
}

function continuous(pitch) {
  const min = 49;
  const max = 49 + 12;
  const between = min + pitch * (max - min);
  return notes.noteToFrequency(between);
}
