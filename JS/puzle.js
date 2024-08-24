const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
const movesDisplay = document.getElementById('moves');
let moves = 0;
let emptyCell = 15;

// Crear el puzzle
function createPuzzle() {
    for (let i = 0; i < 16; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        if (i === 15) {
            piece.classList.add('empty');
        } else {
            piece.textContent = i + 1;
        }
        piece.addEventListener('click', () => movePiece(i));
        puzzleContainer.appendChild(piece);
    }
}

// Mover una pieza
function movePiece(index) {
    if (isAdjacent(index, emptyCell)) {
        const pieces = document.querySelectorAll('.puzzle-piece');
        pieces[emptyCell].textContent = pieces[index].textContent;
        pieces[emptyCell].classList.remove('empty');
        pieces[index].textContent = '';
        pieces[index].classList.add('empty');
        emptyCell = index;
        moves++;
        movesDisplay.textContent = `Movimientos: ${moves}`;
        checkWin();
    }
}

// Verificar si una pieza es adyacente a la celda vacía
function isAdjacent(index, emptyIndex) {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    return (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1);
}

// Mezclar el puzzle
function shufflePuzzle() {
    const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i].textContent, pieces[j].textContent] = [pieces[j].textContent, pieces[i].textContent];
        if (pieces[i].textContent === '') {
            pieces[i].classList.add('empty');
            emptyCell = i;
        } else {
            pieces[i].classList.remove('empty');
        }
    }
    moves = 0;
    movesDisplay.textContent = `Movimientos: ${moves}`;
}

// Verificar si el jugador ha ganado
function checkWin() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    for (let i = 0; i < 15; i++) {
        if (pieces[i].textContent != i + 1) return;
    }
    alert('¡Felicidades! Has resuelto el puzzle.');
}

createPuzzle();
shuffleButton.addEventListener('click', shufflePuzzle);
