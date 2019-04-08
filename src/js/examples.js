// Do this on document load
let queue = document.getElementById('queue');
let startPosition = document.getElementById('headStartPosition');
let cylinderCount = document.getElementById('cylinderCount');
let algorithm = document.getElementById('algorithm');
let checkboxDiv = document.getElementById('algorithmDirectionRadio');

// Depending on algorithm determine if to show checkboxes
switch (algorithm.options[algorithm.selectedIndex].value) {
  case 'FCFS':
    checkboxDiv.classList.add('d-none');
    break;
  case 'SSTF':
    checkboxDiv.classList.add('d-none');
    break;
  case 'SCAN':
    checkboxDiv.classList.remove('d-none');
    break;
  case 'C-SCAN':
    checkboxDiv.classList.remove('d-none');
    break;
  case 'C-LOOK':
    checkboxDiv.classList.remove('d-none');
    break;
}

// Set initial values
queue.value = "98, 183, 37, 122, 14, 124, 65, 67";
startPosition.value = "53";
cylinderCount.value = "200";