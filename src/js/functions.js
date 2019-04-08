// Function gets called on select change
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
  let startPosition = parseInt(document.getElementById('headStartPosition').value);
  let cylinderCount = parseInt(document.getElementById('cylinderCount').value);
  let algorithm = document.getElementById('algorithm');
  let startRightCheckbox = document.getElementById('startRight');
  let startLeftCheckbox = document.getElementById('startLeft');
  let resultDiv = document.getElementById('result');
  let walkedCylinderCounter = document.getElementById('numberOfWalkedCilinders');
  let cylinderSequence = document.getElementById('cylinderSequence');

  // Get cylinder array
  let cylinderArray = queue.value.replace(/\s/g, "").split(",").map(v => parseInt(v)); // get queue as integer array
  let resultArray;

  // Depending on input values determines which function is called
  switch (algorithm.options[algorithm.selectedIndex].value) {
    case 'FCFS':
      resultArray = FCFS(startPosition, cylinderArray);
      break;
    case 'SSTF':
      resultArray = SSTF(startPosition, cylinderArray);
      break;
    case 'SCAN':
      resultArray = startRightCheckbox.checked ? SCANLeftToRight(startPosition, cylinderArray, cylinderCount) : SCANRightToLeft(startPosition, cylinderArray);
      break;
    case 'C-SCAN':
      resultArray = startRightCheckbox.checked ? CSCANLeftToRight(startPosition, cylinderArray, cylinderCount) : CSCANRightToLeft(startPosition, cylinderArray, cylinderCount);
      break;
    case 'C-LOOK':
      resultArray = startRightCheckbox.checked ? CLOOKLeftToRight(startPosition, cylinderArray) : CLOOKRightToLeft(startPosition, cylinderArray);
      break;
  }

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

  for (let i = 0; i < cylinderArray.length; i++) {
    // Finds closest elements index to last element of resultArray & check if index is not already placed in result array
    let smallestDiffIndex = -1; // -1 means that in this cycle there is not found unused element
    let smallestDiff;

    for (let j = 0; j < cylinderArray.length; j++) {
      // Presume that first unused element is closest
      if (smallestDiffIndex === -1 && !usedArrayIndexes.includes(j)) {
        smallestDiff = Math.abs(resultArray[resultArray.length - 1] - cylinderArray[j]);
        smallestDiffIndex = j;
        continue;
      }

      // If that is not first unused element, then check if difference is smaller
      let diff = Math.abs(resultArray[resultArray.length - 1] - cylinderArray[j]);
      if (smallestDiffIndex !== -1 && !usedArrayIndexes.includes(j) && diff < smallestDiff) {
        smallestDiff = diff;
        smallestDiffIndex = j;
      }
    }

    // Add found closest element to result array
    usedArrayIndexes.push(smallestDiffIndex);
    resultArray.push(cylinderArray[smallestDiffIndex]);
  }

  return resultArray;
}

// SCAN Algorithm realisation and first direction is left to right
function SCANLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let sortedArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => a - b); // Sort the array in ascending order
  !sortedArray.includes(cylinderCount - 1) && sortedArray.push(cylinderCount - 1);  // Add last cylinder to the end of the array

  let startingIndex = sortedArray.indexOf(startingPosition);

  let resultArray = [];
  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  for (let i = startingIndex - 1; i >= 0; i--) {
    resultArray.push(sortedArray[i]);
  }
  return resultArray;
}

// SCAN Algorithm realisation and first direction is right to left
function SCANRightToLeft(startingPosition, cylinderArray) {
  let sortedArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => b - a); // Sort the array in descending order
  !sortedArray.includes(0) && sortedArray.push(0); // Add 0th cylinder to end of the array

  let startingIndex = sortedArray.indexOf(startingPosition);

  let resultArray = [];
  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  for (let i = startingIndex - 1; i >= 0; i--) {
    resultArray.push(sortedArray[i]);
  }

  return resultArray;
}

// CSCAN Algorithm realisation and first direction is left to right
function CSCANLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let sortedArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => a - b); // Sort the array in ascending order
  !sortedArray.includes(0) && sortedArray.unshift(0);  // Add 0th cylinder to end of the array
  !sortedArray.includes(cylinderCount - 1) && sortedArray.push(cylinderCount - 1);  // Add last cylinder to the end of the array

  let startingIndex = sortedArray.indexOf(startingPosition);
  let resultArray = [];

  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  if (startingIndex !== 0) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray.push(sortedArray[i]);
    }
  }

  return resultArray;
}

// CSCAN Algorithm realisation and first direction is right to left
function CSCANRightToLeft(startingPosition, cylinderArray, cylinderCount) {
  let sortedArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => b - a); // Sort the array in descending order
  !sortedArray.includes(0) && sortedArray.push(0);  // Add 0th cylinder to end of the array
  !sortedArray.includes(cylinderCount - 1) && sortedArray.unshift(cylinderCount - 1);  // Add last cylinder to the end of the array

  let startingIndex = sortedArray.indexOf(startingPosition);
  let resultArray = [];

  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  if (startingIndex !== sortedArray.length) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray.push(sortedArray[i]);
    }
  }

  return resultArray;
}

// CLOOK Algorithm realisation and first direction is left to right
function CLOOKLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let sortedArray = [].concat(cylinderArray);
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => a - b);

  let startingIndex = sortedArray.indexOf(startingPosition);
  let resultArray = [];

  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  if (startingIndex !== 0) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray.push(sortedArray[i]);
    }
  }

  return resultArray;
}

// CLOOK Algorithm realisation and first direction is right to left
function CLOOKRightToLeft(startingPosition, cylinderArray) {
  let sortedArray = [].concat(cylinderArray);
  sortedArray.push(startingPosition);
  sortedArray.sort((a, b) => b - a);

  let startingIndex = sortedArray.indexOf(startingPosition);
  let resultArray = [];

  for (let i = startingIndex; i < sortedArray.length; i++) {
    resultArray.push(sortedArray[i]);
  }

  if (startingIndex !== sortedArray.length) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray.push(sortedArray[i]);
    }
  }

  return resultArray;
}
