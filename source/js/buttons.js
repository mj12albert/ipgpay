

var continueButtons = document.getElementsByClassName('cont-button');

for (var i=0; i<continueButtons.length; i++) {
  console.log(i);
  continueButtons[i].addeventListener('click', function() {
    console.log(continueButtons[i]);
  })
}