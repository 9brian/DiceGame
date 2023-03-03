const rules = [
  "Rules:",
  "The player who rolls",
  "Snake eyes (or two ones) - will lose",
  "The way to win is roll either a 7 or 11, in any combination between the two die."
]
function rulesPage(){
  // Helped me display with line breaks
  // https://stackoverflow.com/questions/10982913/javascript-how-to-show-each-element-of-array-on-a-new-line
  let gameRules = document.getElementById("gameRules");
  let newRules = "";
  for(let i = 0; i < rules.length; i++){
    newRules += rules[i];
    newRules += "<br>";
    newRules += "<br>";
  }
  gameRules.innerHTML = newRules;
}
document.getElementById("startButton").addEventListener("click", redirectStart);
function redirectStart() {
  // Redirect a page after button click
  // https://stackoverflow.com/questions/2652816/what-is-the-difference-between-document-location-href-and-document-location
  window.location.href = 'balance.html';
};
document.getElementById("playButton").addEventListener("click", redirectPlay);
function redirectStart() {
  window.location.href = 'balance.html';
};
function redirectPlay() {
  window.location.href = 'play.html';
};
function existingFunds() {
  let oldMoney = parseInt(localStorage.getItem("moneyChanger").innerHTML);
  // Check if local storage already exists for key
  // https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists
  if (localStorage.getItem("moneyChanger") !== null){
    oldMoney = localStorage.getItem("moneyChanger");
    document.getElementById("moneyChanger").innerHTML = oldMoney;
  }
}
function addFunds() {
  let moneyIn = parseInt(document.getElementById("moneyField").value);
  let oldMoney = parseInt(document.getElementById("moneyChanger").innerHTML);
  let placeMoney = document.getElementById("moneyChanger");
  if(moneyIn <= 0 || isNaN(moneyIn)){
    alert("Not valid funds.");
  }
  else if(moneyIn > 50){
    alert("Only depost $50 at a time!")
  }
  else{
    placeMoney.innerHTML = oldMoney + moneyIn;
    localStorage.setItem("moneyChanger", placeMoney.innerHTML);
    document.getElementById("moneyField").value = "";
  }
}
function playFunds(){
  let oldMoney = parseInt(localStorage.getItem("moneyChanger").innerHTML);
  if (localStorage.getItem("moneyChanger") !== null){
    oldMoney = localStorage.getItem("moneyChanger");
    document.getElementById("funds").innerHTML = oldMoney;
  }
}
function playButton(){
  window.location.href = 'betting.html';
}
function addBets(){
  let moneyIn = parseInt(document.getElementById("betField").value);
  let oldMoney = parseInt(document.getElementById("betChanger").innerHTML);
  let placeMoney = document.getElementById("betChanger");
  let balance = parseInt(document.getElementById("moneyChanger").innerHTML);
  if(moneyIn <= 0 || isNaN(moneyIn)){
    alert("Not valid funds.");
  }
  else if(moneyIn > balance ){
    alert("You dont have enough funds");
  }
  else{
    placeMoney.innerHTML = oldMoney + moneyIn;
    localStorage.setItem("betChanger", placeMoney.innerHTML);
    document.getElementById("betField").value = "";
    let p = parseInt(placeMoney.innerHTML);
    let newBalance = balance - p;
    document.getElementById("moneyChanger").innerHTML = newBalance;
    localStorage.setItem("moneyChanger", newBalance);
  }
}
function storeBet(){
  let oldMoney = parseInt(document.getElementById("betChanger").innerHTML);
  localStorage.setItem("betChanger", oldMoney);
}
function compAndBet(){
  let jack = parseInt(document.getElementById("jackpot").innerHTML);
  let bet = localStorage.getItem("betChanger");
  let pot = bet * 2;
  document.getElementById("jackpot").innerHTML = pot;
  document.getElementById("compFunds").innerHTML = bet;
}
function compButton(){
  document.getElementById("compButton").disabled = true;
  document.getElementById("rollButton").disabled = false;
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  // Random number for die
  let roll1 = Math.floor(Math.random() * 6) + 1;
  let roll2 = Math.floor(Math.random() * 6) + 1;
  document.getElementById("compDice1").innerHTML = roll1;
  document.getElementById("compDice2").innerHTML = roll2;
}
function userChecker(){
  let userTotal = parseInt(document.getElementById("userDice1").innerHTML) + parseInt(document.getElementById("userDice2").innerHTML);
  let oldMoney = parseInt(localStorage.getItem("moneyChanger").innerHTML);
  if (userTotal == 7 || userTotal == 11){
    document.getElementById("userName").innerHTML = "You Win!";
    document.getElementById("userName").style.background = "green";
    document.getElementById("funds").innerHTML = parseInt(document.getElementById("funds").innerHTML) +
    parseInt(document.getElementById("jackpot").innerHTML);
    document.getElementById("jackpot").innerHTML = "0";
    if (localStorage.getItem("moneyChanger") !== null){
      localStorage.setItem("moneyChanger", parseInt(document.getElementById("funds").innerHTML));
    }
    document.getElementById("compButton").disabled = true;
    document.getElementById("rollButton").disabled = true;
  }
  else if (userTotal == 2){
    document.getElementById("userName").innerHTML = "You lost!";
    document.getElementById("userName").style.background = "black";
    document.getElementById("jackpot").innerHTML = "0";
    document.getElementById("compButton").disabled = true;
    document.getElementById("rollButton").disabled = true;
  }
}
function compChecker(){
  let compTotal = parseInt(document.getElementById("compDice1").innerHTML) + parseInt(document.getElementById("compDice2").innerHTML);
  if (compTotal == 7 || compTotal == 11){
    document.getElementById("compName").innerHTML = "Computer Wins!";
    document.getElementById("compName").style.background = "green";
    document.getElementById("jackpot").innerHTML = "0";
    document.getElementById("compButton").disabled = true;
    document.getElementById("rollButton").disabled = true;
  }
  else if(compTotal == 2){
    document.getElementById("userName").innerHTML = "Computer lost & you win!";
    document.getElementById("userName").style.background = "black";
    document.getElementById("jackpot").innerHTML = "0";
      if (localStorage.getItem("moneyChanger") !== null){
      localStorage.setItem("moneyChanger", parseInt(document.getElementById("funds").innerHTML));
    }
    document.getElementById("compButton").disabled = true;
    document.getElementById("rollButton").disabled = true;
  }
}
function rollButton(){
  let roll1 = Math.floor(Math.random() * 6) + 1;
  let roll2 = Math.floor(Math.random() * 6) + 1;
  document.getElementById("userDice1").innerHTML = roll1;
  document.getElementById("userDice2").innerHTML = roll2;
  setTimeout(userChecker, 400);
  setTimeout(compButton, 500);
  setTimeout(compChecker, 600);
}
function imageResize(){
   document.getElementById("newImage").width = "1";
  document.getElementById("newImage2").width = "1";
}
function imageLoad(){
  // Helped with dynamic image
  // https://stackoverflow.com/questions/44756277/javascript-display-dynamic-changing-image
  let image = document.createElement("img");
  image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2-Dice-Icon.svg/1200px-2-Dice-Icon.svg.png?20081220100537";
  document.getElementById("newImage").appendChild(image);
};
function image2Load(){
  let image = document.createElement("img");
  image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2-Dice-Icon.svg/1200px-2-Dice-Icon.svg.png?20081220100537";
  document.getElementById("newImage2").appendChild(image);
}