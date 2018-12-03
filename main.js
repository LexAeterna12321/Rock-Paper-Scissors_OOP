class Player {
  constructor() {
    this.options = document.querySelectorAll(".select img");
    this.playerChoice = "";
  }
  definePlayerChoice() {
    this.options.forEach(option => {
      option.addEventListener("click", e => {
        this.options.forEach(option => option.classList.remove("img-selected"));
        e.target.classList.add("img-selected");
        this.playerChoice = e.target.dataset.option;
      });
      return this.playerChoice;
    });
  }
}
//
class Computer {
  constructor() {
    this.options = ["papier", "kamień", "nożyczki"];
    this.compChoice = "";
  }
  defineCompChoice() {
    this.compChoice = this.options[
      Math.floor(Math.random() * this.options.length)
    ];
    document.querySelector(
      "[data-summary=ai-choice]"
    ).textContent = this.compChoice;
    return this.compChoice;
  }
}
//
class Result {
  constructor() {
    this.result = "";
  }
  defineResult(playerChoice, compChoice) {
    if (playerChoice === compChoice) {
      this.result = "draw";
      return;
    } else if (playerChoice === "papier") {
      compChoice === "kamień" ? (this.result = "win") : (this.result = "loss");
    } else if (playerChoice === "kamień") {
      compChoice === "nożyczki"
        ? (this.result = "win")
        : (this.result = "loss");
    } else if (playerChoice === "nożyczki") {
      compChoice === "papier" ? (this.result = "win") : (this.result = "loss");
    }
    return this.result;
  }
}
//
class GameStats {
  constructor(games = 0, wins = 0, losses = 0, draws = 0) {
    this.games = games;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
  }
  showStats(result) {
    const games = document.querySelector(".numbers span");
    const wins = document.querySelector(".wins span");
    const losses = document.querySelector(".losses span");
    const draws = document.querySelector(".draws span");
    const whoWin = document.querySelector('[data-summary="who-win"]');
    if (result === "win") {
      ++this.wins;
      whoWin.textContent = "Player";
    } else if (result === "loss") {
      ++this.losses;
      whoWin.textContent = "Computer";
    } else if (result === "draw") {
      ++this.draws;
      whoWin.textContent = "Remis";
    }
    games.textContent = this.games;
    wins.textContent = this.wins;
    losses.textContent = this.losses;
    draws.textContent = this.draws;
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.comp = new Computer();
    this.result = new Result();
    this.gameStats = new GameStats();
    this.gameOver = 5; //whoever gets it, wins it.

    this.startGameBtn = document.querySelector(".start");
    this.playerChoice = document.querySelector("[data-summary=your-choice]");
    this.aiChoice = document.querySelector("[data-summary=ai-choice]");
  }

  startGame() {
    const { player, comp, result, gameStats, gameOver } = this;
    player.definePlayerChoice();
    this.startGameBtn.addEventListener("click", () => {
      if (!player.playerChoice) return alert("Wybierz coś");
      this.playerChoice.textContent = player.playerChoice;
      gameStats.games++;
      comp.defineCompChoice();
      result.defineResult(player.playerChoice, comp.compChoice);
      player.playerChoice = "";
      player.options.forEach(option => option.classList.remove("img-selected"));
      gameStats.showStats(result.result);
      if (gameStats.wins === gameOver || gameStats.losses === gameOver)
        this.restartGame();
    });
  }
  restartGame() {
    let { gameStats, aiChoice, playerChoice } = this;
    const whoWin = document.querySelector('[data-summary="who-win"]');
    gameStats.wins === this.gameOver
      ? alert("Koniec gry, Wygrałeś")
      : alert("Koniec gry, Przegrałeś");

    gameStats.games = 0;
    gameStats.wins = 0;
    gameStats.draws = 0;
    gameStats.losses = 0;
    gameStats.showStats();

    whoWin.textContent = "";
    aiChoice.textContent = "";
    playerChoice.textContent = "";
  }
}
const game = new Game();
game.startGame();
