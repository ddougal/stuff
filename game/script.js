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
        "$50", "$100", "$75", "WAMMY", "PRIZE!",
        "500", "PRIZE!", "WAMMY",
        "$25", "$0", "$200", "$150", "$125",
        "$100", "$75", "WAMMY"
    ];


/*
    const prizes = [
        { type: 'text', value: "$1000" }, { type: 'text', value: "$1500" }, { type: 'text', value: "$500" }, { type: 'text', value: "$4000" }, { type: 'text', value: "PRIZE!" },
        { type: 'text', value: "$800" }, { type: 'text', value: "PRIZE!" }, { type: 'text', value: "$2000" },
        { type: 'text', value: "$750" }, { type: 'text', value: "$500" }, { type: 'text', value: "$1500" }, { type: 'text', value: "$1000" }, { type: 'text', value: "$750" },
        { type: 'text', value: "$1250" }, { type: 'text', value: "$500" }, { type: 'image', src: 'whammy1.png' }
    ];

*/



    function shuffle(array) {
        let currentIndex = array.length;
    
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }
    
    
    shuffle(prizes);
    //console.log(prizes);
    

    

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

 // Generate the 5x5 grid with only border squares
 
 
 /*
 for (let i = 0; i < 25; i++) {
    const square = document.createElement('div');
    if (borderSquaresIndices.includes(i)) {
        square.classList.add('square');
        const prize = prizes[borderSquaresIndices.indexOf(i)];
        if (prize.type === 'text') {
            square.textContent = prize.value;
        } else if (prize.type === 'image') {
            const img = document.createElement('img');
            img.src = prize.src;
            square.appendChild(img);
        }
    } else if (i === 12) {
        continue; // Skip the center square, added separately
    } else {
        square.classList.add('square', 'hidden');
    }
    board.appendChild(square);
}
*/






    const images = ['new.jpg', 'new2.jpg']; // Add your image URLs here
    let currentIndex = 0;

    function fadeInImage() {
        const backgroundDiv = document.getElementById('center-ct');
        backgroundDiv.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;
    }



    function startSpinner() {
        spinning = true;
        startStopButton.textContent = 'Stop';
        startSound.play(); // Play start sound
        spinInterval = setInterval(highlightRandomSquare, 75);
    }

    function stopSpinner() {
        spinning = false;
        startStopButton.textContent = 'Start';
        startSound.pause(); // Play start sound
        //highlightSound.play(); // Play start sound
        clearInterval(spinInterval);
        // Move the highlighted square to the center
        if (currentSquareIndex === "WAMMY") {
            fadeInImage()
        } else {
            moveSquareToCenter(currentSquareIndex);
        }
        
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
    const currentContent = currentSquareElement.innerHTML;
    const isWhammy = currentSquareElement.querySelector('img') !== null;

    // Update center square content
    const centerSquare = document.querySelector('.center-square .center-content');
    if (isWhammy) {
        const whammyImage = currentSquareElement.querySelector('wammy1.jpg').src;
        centerSquare.innerHTML = `<img src="${whammyImage}" alt="WHAMMY!" style="width: 100px; height: 100px;">`;
    } else {
        centerSquare.innerHTML = currentContent;
    }

    // Remove highlight from the border square
    if (currentSquareElement) {
        currentSquareElement.classList.remove('highlighted');
    }
}
});
