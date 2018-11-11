const {Instrument} = require('./instrument');
const {attachHandlers} = require('./handlers');

const notes = require('./notes');

window.onload = function() {
  const audio = new (window.AudioContext || window.webkitAudioContext)();
  let instrument = new Instrument(audio, majorPentatonicScale);
  attachHandlers(instrument, document.getElementById('slider'));

  let canvas = document.getElementById('slider');

  window.addEventListener('resize', resizeCanvas, false);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let ctx = canvas.getContext('2d');
  
  function redraw() {
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = '#363636';
    ctx.strokeStyle = '#f45954';
    console.log("Redraw");
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("resizeCanvas");
    redraw();
  }

  ctx.fillStyle = '#363636';
  ctx.strokeStyle = '#f45954';

  let length = 0;
  let dlength = 4;

  let frequency = Infinity;
  
  let interval = setInterval(() => {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight/3);
    for (let x = 0; x < canvas.width; x++) {
      let y = (window.innerHeight/3) + length * Math.sin(x * x * 200 / frequency);
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

var button_state = false;
state_button.onclick =  function (event) {
  button_state = !(button_state);
  var button = document.getElementById("state_label");
  if (button_state == true) {
    button.innerHTML = "Mouse";
    console.log(button_state);
  } else if (button_state == false) {
    button.innerHTML = "JoyCons";
    console.log(button_state);
  }
}
