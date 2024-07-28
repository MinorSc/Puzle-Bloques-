


const puzzleContainer = document.getElementById('puzzle-container');
const pieces = Array.from(puzzleContainer.children);
let emptyIndex = 8;

function initPuzzle() {
    pieces.forEach((piece, index) => {
        piece.textContent = index + 1;
        piece.classList.remove('empty');
        piece.style.backgroundImage = 'url("https://via.placeholder.com/100")';
        piece.style.backgroundPosition = `-${(index % 3) * 100}px -${Math.floor(index / 3) * 100}px`;
    });
    pieces[emptyIndex].classList.add('empty');
}

function movePiece(index) {
    if (isAdjacent(emptyIndex, index)) {
        [pieces[emptyIndex].textContent, pieces[index].textContent] = [pieces[index].textContent, pieces[emptyIndex].textContent];
        pieces[emptyIndex].style.backgroundPosition = pieces[index].style.backgroundPosition;
        pieces[index].style.backgroundPosition = `-${(emptyIndex % 3) * 100}px -${Math.floor(emptyIndex / 3) * 100}px`;
        pieces[emptyIndex].classList.remove('empty');
        pieces[index].classList.add('empty');
        emptyIndex = index;
    }
}

function isAdjacent(emptyIndex, index) {
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const indexRow = Math.floor(index / 3);
    const indexCol = index % 3;

    const rowDiff = Math.abs(emptyRow - indexRow);
    const colDiff = Math.abs(emptyCol - indexCol);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

pieces.forEach((piece, index) => {
    piece.addEventListener('click', () => movePiece(index));
});

initPuzzle();
