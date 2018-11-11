const {Instrument} = require('./instrument');
const handlers = require('./handlers');

const notes = require('./notes');

window.onload = function() {
  const scales = [continuous, majorPentatonicScale, minorPentatonicScale];
  let scaleIndex = 0;
  let scale_button = document.getElementById('scale_button');
  let scale_label = document.getElementById('scale_label');
  scale_label.innerHTML = scales[scaleIndex].name;

  const audio = new (window.AudioContext || window.webkitAudioContext)();

  let instrument = new Instrument(audio, scales[scaleIndex++]);
  let drum = new Audio('/sounds/bass_drum.wav');
  let hihat = new Audio('/sounds/hihat.wav');

  let sounds = {
    main: instrument,
    drum: drum,
    hihat: hihat
  }
  handlers.attachMouseHandlers(sounds, document.getElementById('slider'));
  handlers.attachJoyconHandlers(sounds);

  let button = document.getElementById('state_label');
  let button_state = false;
  let state_button = document.getElementById('state_button');
  state_button.addEventListener('click', (event) => {
    button_state = !(button_state);
    if (button_state == true) {
      button.innerHTML = 'Mouse';
    } else if (button_state == false) {
      button.innerHTML = 'JoyCons';
    }
    handlers.toggleInputs();
  })

  scale_button.addEventListener('click', (event) => {
    instrument.generator = scales[scaleIndex];
    scale_label.innerHTML = instrument.generator.name;
    if (++scaleIndex >= scales.length) {
      scaleIndex = 0;
    }
  })

  let canvas = document.getElementById('slider');

  window.addEventListener('resize', resizeCanvas, false);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let ctx = canvas.getContext('2d');
  
  function redraw() {
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = '#102027';
    ctx.strokeStyle = '#f45954';
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
  }

  ctx.fillStyle = '#102027';
  ctx.strokeStyle = '#f45954';

  let length = 0;
  let dlength = 4;

  let frequency = Infinity;
  
  let interval = setInterval(() => {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight/2);
    for (let x = 0; x < canvas.width; x++) {
      let y = (window.innerHeight/2) + length * Math.sin(x * x * 200 / frequency);
      ctx.lineTo(x, y);
    }
    ctx.stroke(); 

    length += dlength;
    if (length >= 100 || length <= -100) {
      dlength = -dlength;
    }
  }, 2)

  instrument.onplay = (freq) => {
    frequency = freq;
  }

  instrument.onpause = (freq) => {
    frequency = Infinity;
  }
}

function majorPentatonicScale(pitch) {
  const base = 49;
  const majorScale = [base, base + 2, base + 4, base + 7, base + 9, base + 12];

  const note = majorScale[Math.floor(pitch * majorScale.length)];
  return notes.noteToFrequency(note);
}

function minorPentatonicScale(pitch) {
  const base = 49;
  const majorScale = [base, base + 3, base + 5, base + 7, base + 10, base + 12];

  const note = majorScale[Math.floor(pitch * majorScale.length)];
  return notes.noteToFrequency(note);
}

function continuous(pitch) {
  const min = 49;
  const max = 49 + 12;
  const between = min + pitch * (max - min);
  return notes.noteToFrequency(between);
}
