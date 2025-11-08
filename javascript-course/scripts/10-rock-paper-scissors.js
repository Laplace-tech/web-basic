
const record = {
    wins: 0,
    losses: 0,
    ties: 0,
};

// 초기화
loadPreviousRecord();
showRecordElement();

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = fightEachOther(playerMove, computerMove);

    updateRecord(result);
    saveRecord();

    showResultElement(result);
    showMovesElement(playerMove, computerMove);
}

function getComputerMove() {
    const random = Math.random();
    if (random < 1 / 3) return "rock";
    else if (random < 2 / 3) return "scissors";
    else return "paper";
}

function fightEachOther(playerMove, computerMove) {
    if (playerMove === computerMove) return "ties";
    else if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "scissors" && computerMove === "paper") ||
        (playerMove === "paper" && computerMove === "rock")
    ) {
        return "wins";
    } else {
        return "losses";
    }
}

function updateRecord(result) {
    record[result]++;
    console.log(`updateRecord(): ${JSON.stringify(record)}`);
}

function saveRecord() {
    const jsonRecord = JSON.stringify(record);
    console.log(`saveRecord(): jsonRecord = ${jsonRecord}`);
    localStorage.setItem("record", jsonRecord);
    showRecordElement();
}

function loadPreviousRecord() {
    const storedRecord = localStorage.getItem("record");
    if (!storedRecord) return;

    try {
        const parsedRecord = JSON.parse(storedRecord);
        for (const key in record) {
            if (parsedRecord.hasOwnProperty(key)) {
                record[key] = Number(parsedRecord[key]) || 0;
            }
        }
    } catch (error) {
        console.warn("loadPreviousRecord(): JSON parse failed", error);
        localStorage.removeItem("record"); // 손상된 데이터 초기화
    }
}

function showResultElement(gameResult) {
    document.querySelector(".js-result").textContent = `You ${gameResult}!`;
}

function showMovesElement(playerMove, computerMove) {
    //   document.querySelector(".js-moves").textContent = 
    // `Player: ${playerMove}, Computer: ${computerMove}`;
    const movesElement = document.querySelector('.js-moves');
    console.log(movesElement);
    console.log(movesElement.innerHTML);
    movesElement.innerHTML
        = `You\n
            <img src="img/${playerMove}-emoji.png" class="move-icon">\n
            <img src="img/${computerMove}-emoji.png" class="move-icon">\n
            Computer`;
}

function showRecordElement() {
    document.querySelector(".js-record").textContent =
        `Wins: ${record.wins}, Losses: ${record.losses}, Ties: ${record.ties}`;
}

function resetRecord() {
    record.wins = 0;
    record.losses = 0;
    record.ties = 0;
    saveRecord();
}
