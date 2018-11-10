window.onload = function() {
  console.log('Hello world!');
}
var button_state = false;
var mouse_input = document.getElementById('mouse_input');

mouse_input.onmousemove = function (event) {
  mouse_input.textContent = 'screen: (' + event.screenX + ', ' + event.screenY + ')\n' +
    'client: (' + event.clientX + ', ' + event.clientY + ')';
};
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