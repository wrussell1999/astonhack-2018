const {Instrument} = require('./instrument');
const handlers = require('./handlers');

const notes = require('./notes');

const audio = new (window.AudioContext || window.webkitAudioContext)();
let soundBuffers = {};

window.onload = function() {
  let instrument = new Instrument(audio, continuous);

  loadSound("static/sounds/bass_drum.wav");
  loadSound("static/sounds/hihat.wav");

  let drum_play = function() {
    playSound(soundBuffers["static/sounds/bass_drum.wav"]);
  }

  let hithat_play = function() {
    playSound(soundBuffers["static/sounds/hihat.wav"]);
  }

  let sounds = {
    main: instrument,
    drum: drum_play,
    hihat: hithat_play
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

  const scales = [continuous, majorPentatonicScale, minorPentatonicScale];
  let scaleIndex = 0;
  let click_handle = () => {
    instrument.generator = scales[scaleIndex];
    scale_label.innerHTML = instrument.generator.name;
    if (++scaleIndex >= scales.length) {
      scaleIndex = 0;
    }
  }
  scale_button.addEventListener('click', click_handle);
  click_handle(null);

  let canvas = document.getElementById('slider');

  const fill_colour = '#363636';
  const stroke_colour = '#f45954';

  window.addEventListener('resize', resizeCanvas, false);

  let ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fill_colour;
    ctx.strokeStyle = stroke_colour;
    ctx.stroke();
  }

  const base_frequency = 50;

  let target_frequency = base_frequency;
  let current_frequency = target_frequency;
  let hysteresis_value = 5;

  function callback() {
    draw_frame();
    window.requestAnimationFrame(callback);
  }

  function draw_frame() {
    if (current_frequency < (target_frequency - hysteresis_value)) {
      current_frequency += 0.08 * (target_frequency - current_frequency);
    } else if (current_frequency > (target_frequency + hysteresis_value)) {
      current_frequency -= 0.08 * (current_frequency - target_frequency);
    }

    let base_amplitude = canvas.height / 3;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 5;
    for (let x = 0; x < canvas.width; x += 2) {
      let y = (canvas.height/2.4) + base_amplitude * Math.sin((x + 700) * Math.pow(current_frequency,3) * 0.0000000001);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  instrument.onplay = (freq) => {
    target_frequency = freq;
  }

  instrument.onpause = (freq) => {
    target_frequency = base_frequency;
  }

  resizeCanvas();
  window.requestAnimationFrame(callback);
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

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.url = url;
  // Decode asynchronously
  request.onload = function() {
    audio.decodeAudioData(request.response, function(buffer) {
      soundBuffers[request.url] = buffer;
  }); }
  request.send();
}

function playSound(buffer) {
  var source = audio.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(audio.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
}
