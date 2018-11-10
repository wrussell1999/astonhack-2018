function noteToFrequency(note) {
  return 440 * Math.pow(2, (note - 49) / 12);
}

function frequencyToNote(freq) {
  return 12 * Math.log2(freq / 440);
}

module.exports = {
  noteToFrequency: noteToFrequency,
  frequencyToNote: frequencyToNote
}
