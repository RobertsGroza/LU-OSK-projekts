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
    // atrod tuvākā elementa indexu rezultāta masīva pēdējam elementam, turklāt indekss nevar atrastes izmantoto indexu masīvā
    let smallestDiffIndex = -1; // Norāda, ka otrais for cikls tikko sākās
    let smallestDiff;

    for (let j = 0; j < cylinderArray.length; j++) {
      // Pieņem, ka pirmais elements masīvā, kas nav izmantots ir ar vismazāko starpību
      if (smallestDiffIndex === -1 && !usedArrayIndexes.includes(j)) {
        smallestDiff = Math.abs(resultArray[resultArray.length - 1] - cylinderArray[j]);
        smallestDiffIndex = j;
        continue;
      }

      // Ja tas nav pirmais elements, kas nav jau iekļauts rezultāta sarakstā tad pārbauda, vai starpība nav mazāka
      let diff = Math.abs(resultArray[resultArray.length - 1] - cylinderArray[j]);
      if (smallestDiffIndex !== -1 && !usedArrayIndexes.includes(j) && diff < smallestDiff) {
        smallestDiff = diff;
        smallestDiffIndex = j;
      }
    }

    // rezultātu masīvam pievieno atrasto elementu
    usedArrayIndexes.push(smallestDiffIndex);
    resultArray.push(cylinderArray[smallestDiffIndex]);
  }

  return resultArray;
}

// SCAN Algorithm realisation and first direction is left to right
function SCANLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => a - b); // Sakārto doto masīvu augošā secībā
  !resultArray.includes(cylinderCount - 1) && resultArray.push(cylinderCount - 1);  // Pievieno galējo cilindru masīva beigās

  let startingIndex = resultArray.indexOf(startingPosition);

  let resultArray2 = [];
  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  for (let i = startingIndex - 1; i >= 0; i--) {
    resultArray2.push(resultArray[i]);
  }
  return resultArray2;
}

// SCAN Algorithm realisation and first direction is right to left
function SCANRightToLeft(startingPosition, cylinderArray) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => b - a); // Sakārto doto masīvu distošā secībā
  !resultArray.includes(0) && resultArray.push(0);  // pievieno mazāko cilindru masīva beigās

  let startingIndex = resultArray.indexOf(startingPosition);

  let resultArray2 = [];
  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  for (let i = startingIndex - 1; i >= 0; i--) {
    resultArray2.push(resultArray[i]);
  }

  return resultArray2;
}

// CSCAN Algorithm realisation and first direction is left to right
function CSCANLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => a - b); // Sakārto doto masīvu augošā secībā
  !resultArray.includes(0) && resultArray.unshift(0);  // Pievieno pirmo cilindru masīva sākumā
  !resultArray.includes(cylinderCount - 1) && resultArray.push(cylinderCount - 1);  // Pievieno galējo cilindru masīva beigās

  let startingIndex = resultArray.indexOf(startingPosition);
  let resultArray2 = [];

  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  if (startingIndex !== 0) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray2.push(resultArray[i]);
    }
  }

  return resultArray2;
}

// CSCAN Algorithm realisation and first direction is right to left
function CSCANRightToLeft(startingPosition, cylinderArray, cylinderCount) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => b - a); // Sakārto doto masīvu distošā secībā
  !resultArray.includes(0) && resultArray.push(0);  // Pievieno pirmo cilindru masīva sākumā
  !resultArray.includes(cylinderCount - 1) && resultArray.unshift(cylinderCount - 1);  // Pievieno galējo cilindru masīva beigās

  let startingIndex = resultArray.indexOf(startingPosition);
  let resultArray2 = [];

  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  if (startingIndex !== resultArray.length) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray2.push(resultArray[i]);
    }
  }

  return resultArray2;
}

// CLOOK Algorithm realisation and first direction is left to right
function CLOOKLeftToRight(startingPosition, cylinderArray, cylinderCount) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => a - b); // Sakārto doto masīvu augošā secībā

  let startingIndex = resultArray.indexOf(startingPosition);
  let resultArray2 = [];

  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  if (startingIndex !== 0) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray2.push(resultArray[i]);
    }
  }

  return resultArray2;
}

// CLOOK Algorithm realisation and first direction is right to left
function CLOOKRightToLeft(startingPosition, cylinderArray) {
  let resultArray = [].concat(cylinderArray); // Concat so cylinder array do not get changed in process
  resultArray.push(startingPosition);
  resultArray.sort((a, b) => b - a); // Sakārto doto masīvu distošā secībā

  let startingIndex = resultArray.indexOf(startingPosition);
  let resultArray2 = [];

  for (let i = startingIndex; i < resultArray.length; i++) {
    resultArray2.push(resultArray[i]);
  }

  if (startingIndex !== resultArray.length) {
    for (let i = 0; i < startingIndex; i++) {
      resultArray2.push(resultArray[i]);
    }
  }

  return resultArray2;
}
