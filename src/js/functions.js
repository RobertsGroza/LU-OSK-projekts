function algorithmChange() {
  let algorithm = document.getElementById('algorithm');
  let selectedAlgorithm = algorithm.options[algorithm.selectedIndex].value;

  if (selectedAlgorithm === 'FCFS' || selectedAlgorithm === 'SSTF') {
    document.getElementById('algorithmDirectionRadio').classList.add('d-none');
  }  else {
    document.getElementById('algorithmDirectionRadio').classList.remove('d-none');
  }
}

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
  // Find elements
  let queue = document.getElementById('queue');
  let startPosition = document.getElementById('headStartPosition');
  let algorithm = document.getElementById('algorithm');
  let startRightCheckbox = document.getElementById('startRight');
  let startLeftCheckbox = document.getElementById('startLeft');
  let resultDiv = document.getElementById('result');
  let walkedCylinderCounter = document.getElementById('numberOfWalkedCilinders');
  let cylinderSequence = document.getElementById('cylinderSequence');
  let cylinderArray = queue.value.replace(/\s/g, "").split(",").map(v => parseInt(v)); // get queue as integer array
  cylinderArray = [98, 183, 37, 122, 14, 124, 65, 67];
  let resultArray;

  console.log('before: ', cylinderArray);

  // Depending on input values determines which function is called
  switch (algorithm.options[algorithm.selectedIndex].value) {
    case 'FCFS':
      resultArray = FCFS(parseInt(startPosition.value), cylinderArray);
      break;
    case 'SSTF':
      SSTF();
      break;
    case 'SCAN':
      startRightCheckbox.checked ? SCANLeftToRight() : SCANRightToLeft();
      break;
    case 'C-SCAN':
      startRightCheckbox.checked ? CSCANLeftToRight() : CSCANRightToLeft();
      break;
    case 'C-LOOK':
      startRightCheckbox.checked ? CLOOKLeftToRight() : CLOOKRightToLeft();
      break;
  }

  console.log('after: ', cylinderArray);

  // Count number of cylinders walked
  cylinderSequence.innerHTML = resultArray.join(', ');
  walkedCylinderCounter.innerHTML = numberOfCylindersWalked(resultArray).toString();

  resultDiv.classList.remove('d-none');
  drawChart(resultArray); // Draw visualization chart
}

// Returns number of cylinders walked
function numberOfCylindersWalked(cylinderArray) {
  let walkedCylinderCount = 0;

  cylinderArray.map(function(el, idx, arr) {
    if (idx !== 0) {
      walkedCylinderCount += Math.abs(arr[idx - 1] - el);
    }
  });

  return walkedCylinderCount;
}

// FCFS Algorithm realisation
function FCFS(startingPosition, cylinderArray) {
  cylinderArray.unshift(startingPosition);
  return cylinderArray;
}

// SSTF Algorithm realisation
function SSTF(startingPosition, cylinderArray) {
  let resultArray = [];
  let usedArrayIndexes = [];
  resultArray[0] = startingPosition;

  cylinderArray.map(function(el, idx, array){
    array.map(function (e, i, arr) {
      // Find closest element to current element (which is last in the result array)
      let closestCylinderIndex;
      let closestDifference;

      if (!usedArrayIndexes.includes(i)) {
        closestCylinderIndex = i;
        closestDifference = Math.abs(arr[idx] - resultArray[resultArray.length - 1]);
      }

    })
  });
}

// SCAN Algorithm realisation and first direction is left to right
function SCANLeftToRight(startingPosition, cylinderArray) {
  console.log('scan-left');
}

// SCAN Algorithm realisation and first direction is right to left
function SCANRightToLeft(startingPosition, cylinderArray) {
  console.log('scan-right');
}

// CSCAN Algorithm realisation and first direction is left to right
function CSCANLeftToRight(startingPosition, cylinderArray) {
  console.log('cscan-left');
}

// CSCAN Algorithm realisation and first direction is right to left
function CSCANRightToLeft(startingPosition, cylinderArray) {
  console.log('cscan-right');
}

// CLOOK Algorithm realisation and first direction is left to right
function CLOOKLeftToRight(startingPosition, cylinderArray) {
  console.log('clook-left');
}

// CLOOK Algorithm realisation and first direction is right to left
function CLOOKRightToLeft(startingPosition, cylinderArray) {
  console.log('clook-right');
}
