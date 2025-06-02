document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let board = Array(3).fill().map(() => Array(3).fill(''));
    let currentPlayer = 'X';
    let gameActive = true;

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', i);
                cell.setAttribute('data-col', j);
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(e) {
        const row = e.target.getAttribute('data-row');
        const col = e.target.getAttribute('data-col');

        if (board[row][col] !== '' || !gameActive || currentPlayer !== 'X') {
            return;
        }

        board[row][col] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = 'Вы выиграли!';
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            status.textContent = 'Ничья!';
            gameActive = false;
            return;
        }

        currentPlayer = 'O';
        status.textContent = 'Ход компьютера';
        setTimeout(computerMove, 500);
    }

    function computerMove() {
        if (!gameActive) return;

        let emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const { row, col } = emptyCells[randomIndex];
            board[row][col] = 'O';
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = 'O';

            if (checkWin()) {
                status.textContent = 'Компьютер выиграл!';
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                status.textContent = 'Ничья!';
                gameActive = false;
                return;
            }
        }

        currentPlayer = 'X';
        status.textContent = 'Ваш ход';
    }

    function checkWin() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return true;
            }
        }

        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }

        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }

        return false;
    }

    function checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    restartButton.addEventListener('click', () => {
        board = Array(3).fill().map(() => Array(3).fill(''));
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = 'Ваш ход';
        createBoard();
    });

    createBoard();
});
