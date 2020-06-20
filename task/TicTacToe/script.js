let mass = [];
let Size;
let winner;
let role;
//HTML Element
let Game = document.getElementById('Game');
//let Settings = document.getElementById('Settings');

//Function
function startGame(){
  Size = parseInt(document.getElementById('Size').value);
  if (Size<3){
    alert("Слишком маленькое поле");
  }
  else if (Size>6){
    alert("Слишком большое поле");
  }
  else{
    winner = 'none';
    Game.innerHTML = '';
    role = 'player';
    Game.style.width = Size * 100 + 'px';
    Game.style.height = Size * 100 + 'px';
    Game.style.backgroundColor = 'rgb(245, 135, 0)';

    for (let x = 0; x < Size; x++) {
      mass[x] = [];
      for (let y = 0; y < Size; y++) {
        Game.innerHTML+='<div class="cell" id=' + x + y  + ' onclick=move(' + x + ',' +y + ')> </div>';
      }
    }
  }
}

function ai() {
  let x = Math.floor(Math.random() * Size);
  let y = Math.floor(Math.random() * Size);
  mass[x][y] ? ai() : move(x, y);
}

function checkEnd() {
  let score = 0;
  let scoreAiX = 0, scoreAiY = 0;
  let scorePlayerX = 0, scorePlayerY = 0;
  //Ходим по строкам
  for (let x = 0; x < Size; x++) { 
    for (let y = 0; y < Size; y++) {
      if(mass[x][y]=='ai') {scoreAiX++; score++;}
      else if(mass[x][y]=='player') {scorePlayerX++; score++;} 

      if(mass[y][x]=='ai') scoreAiY++;
      else if(mass[y][x]=='player') scorePlayerY++;
    }
    //Проверка на победу
    if(scoreAiX == Size || scoreAiY == Size) return 'ai'; 
    else {
      scoreAiX = 0; 
      scoreAiY = 0;
    }
    if(scorePlayerX == Size || scorePlayerY == Size) return 'player'; 
    else {
      scorePlayerX = 0; 
      scorePlayerY = 0;
    }
  }

  //Ходим по диагональным строкам
  for (let x = 0; x < Size; x++) { 
    if(mass[x][x]=='ai') scoreAiX++;
    else if(mass[x][x]=='player') scorePlayerX++;

    if(mass[x][Size-x - 1 ]=='ai') scoreAiY++;
    else if(mass[x][x]=='player') scorePlayerY++;
  }
  //Проверка на победу
  if(scoreAiX == Size || scoreAiY == Size) return 'ai';
  if(scorePlayerX == Size || scorePlayerY == Size) return 'player';
  if(score == Size*Size) return'draw';
  //Если победителя нет, возвращаем none
  return 'none'
}

function move(x, y) {
  if(winner == 'none'){
    if(mass[x][y]) return false;
    mass[x][y] = role;
    document.getElementById(String(x)+String(y)).className = 'cell ' + role;
    role = (role == 'player') ? 'ai' : 'player'

    winner = checkEnd();
    if (winner == 'none'){
        if(role == 'ai') ai()
    }
    else reset(winner);
    //(role == 'player') ? ai() : null
  }
}

function reset(winner) {
  switch (winner) {
    case 'player':
      document.getElementById('ScoreX').value++;
      alert("Вы победили!");
      break;
    case 'ai':
      document.getElementById('ScoreY').value++;
      alert("Вы проиграли :(");
      break;
    case 'draw':
      document.getElementById('ScoreX').value++;
      document.getElementById('ScoreY').value++;
      alert("Ничья -_-");
      break;
  }
}