// player class to store who starts the game
//player1 is always cross and player2 is always circle
class player {
  constructor() {
    this.startingplayer = false;
    this.icon = "";
  }
}
// getting dom elements
let startbtn = document.querySelector("#start");
let player1btn = document.querySelector("#player1");
let player2btn = document.querySelector("#player2");
let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart");
// essential variables for functioning of game
let winner = undefined;
let ingame = false;
let currentplayer = undefined;
let player1 = new player();
player1.icon = "url('cross.png')";
let player2 = new player();
player2.icon = "url('circle.png')";
let boardstate = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// start button, it starts buttons and initializes game functionality, after 1 use it deactivates and you can restart game with "Restart" button
startbtn.addEventListener("click", function () {
  setupPlayers();
  BoardStart();
  startbtn.disabled = "true";
});
//sets up board buttons and determines who is winner
function BoardStart() {
  boxes.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (ingame) {
        if (currentplayer.startingplayer == true) {
          item.style.backgroundImage = currentplayer.icon;
          item.style.backgroundSize = "cover";
          item.disabled = true;
          boardstate[index] = 1;
          if (checkWinner()) {
            winner = currentplayer;
            ingame = false;
            boxes.forEach((value) => {
              value.disabled = "true";
            });
          }
        } else {
          item.style.backgroundImage = currentplayer.icon;
          item.style.backgroundSize = "cover";
          item.disabled = true;
          boardstate[index] = -1;
          if (checkWinner()) {
            winner = currentplayer;
            ingame = false;
            boxes.forEach((value) => {
              value.disabled = "true";
            });
          }
        }
        if (winner == undefined && boardstate.some((item) => item == 0)) {
          changePlayer();
        } else {
          displayWinner();
        }
      } else {
        alert("please select starting player by pressing on one of players");
      }
    });
  });
}
// sets up starting player buttons, and shows who's turn is
function setupPlayers() {
  player1btn.style.backgroundColor = "grey";
  player2btn.style.backgroundColor = "grey";
  player1btn.addEventListener("click", function () {
    player1.startingplayer = true;
    currentplayer = player1;
    player1btn.style.backgroundColor = "orange";
    player2btn.style.backgroundColor = "#212529";
    ingame = true;
    player1btn.disabled = true;
    player2btn.disabled = true;
  });
  player2btn.addEventListener("click", function () {
    player2.startingplayer = true;
    currentplayer = player2;
    player2btn.style.backgroundColor = "orange";
    player1btn.style.backgroundColor = "#212529";
    ingame = true;
    player1btn.disabled = true;
    player2btn.disabled = true;
  });
  alert("please select starting player");
}
// changes players, when one makes a move
function changePlayer() {
  if (currentplayer == player1) {
    currentplayer = player2;
    player1btn.style.backgroundColor = "#212529";
    player2btn.style.backgroundColor = "orange";
  } else {
    currentplayer = player1;
    player2btn.style.backgroundColor = "#212529";
    player1btn.style.backgroundColor = "orange";
  }
}
//displays a winner
function displayWinner() {
  if (winner == player1) {
    player1btn.style.backgroundColor = "green";
  } else if (winner == player2) {
    player2btn.style.backgroundColor = "green";
  } else {
    player1btn.style.backgroundColor = "red";
    player2btn.style.backgroundColor = "red";
  }
}
//resets game, used with restart button
function resetgame() {
  player1btn.disabled = false;
  player2btn.disabled = false;
  player1btn.style.backgroundColor = "grey";
  player2btn.style.backgroundColor = "grey";
  boardstate = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  winner = undefined;
  ingame = false;
  currentplayer = undefined;
  player1.startingplayer = false;
  player2.startingplayer = false;
  boxes.forEach((item) => {
    item.disabled = false;
    item.style.backgroundImage = "none";
  });
}
//restart button
restart.addEventListener("click", resetgame);

//checks who is winner by counting boardstate, initial board is 3x3 matrix, which has 0 in cell, starting player pushes value 1 in placed cell, and player 2 pushes -1
// by counting rows, columns and diagonals, we can determine if someone won, if sum value becomes 3 or -3 in row, column or diagonal
function checkWinner() {
  let matrix = [
    [boardstate[0], boardstate[1], boardstate[2]],
    [boardstate[3], boardstate[4], boardstate[5]],
    [boardstate[6], boardstate[7], boardstate[8]],
  ];
  //   // sum rows
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
      if (sum == 3 || sum == -3) {
        console.log("winner is found");
        return true;
      }
    }
    sum = 0;
  }
  sum = 0;
  //   sum columns
  for (let j = 0; j < matrix.length; j++) {
    for (let i = 0; i < matrix[j].length; i++) {
      sum += matrix[i][j];
      if (sum == 3 || sum == -3) {
        console.log("winner is found");
        return true;
      }
    }
    sum = 0;
  }
  // sum diagonals
  sum = matrix[0][0] + matrix[1][1] + matrix[2][2];
  if (sum == 3 || sum == -3) {
    console.log("winner is found");
    return true;
  }
  sum = matrix[0][2] + matrix[1][1] + matrix[2][0];
  if (sum == 3 || sum == -3) {
    console.log("winner is found");
    return true;
  }
}
