const {Instrument} = require('./instrument');
const handlers = require('./handlers');

const notes = require('./notes');

window.onload = function() {
  const audio = new (window.AudioContext || window.webkitAudioContext)();

  let instrument = new Instrument(audio, continuous);
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
