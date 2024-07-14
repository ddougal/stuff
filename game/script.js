
document.addEventListener('DOMContentLoaded', function () {
    let spinning = false;
    let spinInterval;
    let currentSquareIndex = -1;
    const board = document.getElementById('board');
    const startStopButton = document.getElementById('startStopButton');

    // Indices for border squares
    const borderSquaresIndices = [
        0, 1, 2, 3, 4, // Top row
        9, 14, 19, // Right column
        24, 23, 22, 21, 20, // Bottom row
        15, 10, 5 // Left column
    ];

 
    const prizes = [
        "400", "300", "100", "WHAMMY", "FreeSpace",
        "200", "FreeSpace", "WHAMMY",
        "100", "FreeSpace", "200", "300", "100",
        "100", "200", "WHAMMY"
    ];

 

    // Generate the 5x5 grid with only border squares
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        if (borderSquaresIndices.includes(i)) {
            square.classList.add('square');
            square.textContent = prizes[borderSquaresIndices.indexOf(i)];
        } else if (i === 12) {
            continue; // Skip the center square, added separately
        } else {
            square.classList.add('square', 'hidden');
        }
        board.appendChild(square);
    }

 
    const squares = document.querySelectorAll('.square');
    startStopButton.addEventListener('click', function () {
        if (!spinning) {
            startSpinner();
        } else {
            stopSpinner();
        }
    });

 
    function startSpinner() {
        spinning = true;
        startStopButton.textContent = 'Stop';
        startSound.play();
        spinInterval = setInterval(highlightRandomSquare, 100);
    }

 

    function stopSpinner() {
        spinning = false;
        startStopButton.textContent = 'Start';
        clearInterval(spinInterval);
        // Move the highlighted square to the center
        moveSquareToCenter(currentSquareIndex);
    }

 
    function highlightRandomSquare() {
        // Remove highlight from the current square if there is one
        if (currentSquareIndex !== -1 && squares[borderSquaresIndices[currentSquareIndex]]) {
            squares[borderSquaresIndices[currentSquareIndex]].classList.remove('highlighted');
        }

        // Select a new random square
        currentSquareIndex = Math.floor(Math.random() * borderSquaresIndices.length);
 

        // Highlight the new square
        if (squares[borderSquaresIndices[currentSquareIndex]]) {
            squares[borderSquaresIndices[currentSquareIndex]].classList.add('highlighted');
        }
    }

 

    function moveSquareToCenter(index) {
        if (index === -1) return;
 
        // Get the current highlighted square
        const currentSquareElement = squares[borderSquaresIndices[index]];
        const currentContent = currentSquareElement.textContent;
        const contentDiv = document.getElementById('mycontent');
 
    if (currentContent === "WHAMMY") {
        contentDiv.innerHTML = `<img src="test2.png" width="850" height="265" alt="Image">`;
    } else {
        // Update center square content
        const centerSquare = document.querySelector('.center-square .center-content');
        centerSquare.textContent = currentContent;
    }

 

        // Remove highlight from the border square
        if (currentSquareElement) {
            currentSquareElement.classList.remove('highlighted');
        }
    }
});