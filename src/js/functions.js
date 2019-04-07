function clearForm() {
  // Find elements
  let queue = document.getElementById('queue');
  let startPosition = document.getElementById('headStartPosition');
  let resultDiv = document.getElementById('result');

  // Clear form values and hide div
  queue.value = '';
  startPosition.value = '';
  resultDiv.classList.add('d-none');
}

function visualize() {
  // Show result div
  let resultDiv = document.getElementById('result');
  resultDiv.classList.remove('d-none');

  drawChart([20, 13, 44, 53, 22]);
}

// FCFS Algorithm realisation
function FCFS() {
  console.log('fcfs');
}

// SSTF Algorithm realisation
function SSTF() {
  console.log('sstf');
}

// SCAN Algorithm realisation
function SCAN() {
  console.log('scan');
}

// CSCAN Algorithm realisation and first direction is left to right
function CSCANLeftToRight() {
  console.log('cscan-left');
}

// CSCAN Algorithm realisation and first direction is right to left
function CSCANRightToLeft() {
  console.log('cscan-right');
}

// CLOOK Algorithm realisation and first direction is left to right
function CLOOKLeftToRight() {
  console.log('clook-left');
}

// CLOOK Algorithm realisation and first direction is right to left
function CLOOKRightToLeft() {
  console.log('clook-right');
}
