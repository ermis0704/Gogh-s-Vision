document.addEventListener('DOMContentLoaded', () => {


  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('.score');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0;
  let starIndex = 0;
  let currentGoghStar = [];
  let currentGogh = [0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime= 0;
  let interval = 0;

  //what the game begin all setting will be reset for 'Restart'
  function startGame() {
    currentGogh.forEach(index => squares[index].classList.remove('gogh'));
    currentGoghStar.forEach(index => squares[index].classList.remove('goghStar'));
    squares[starIndex].classList.remove('star');
    clearInterval(interval);
    score = 0;

    randomStar();
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentGogh = [0];
    currentGoghStar = [];
    currentIndex = 0;
    currentGogh.forEach(index => squares[index].classList.add('gogh'));
    interval = setInterval(moveOutComes, intervalTime);
  }


  function moveOutComes () {
    if(
      ((currentGogh[0] % width === width - 1) && (direction === 1))||
      ((currentGogh[0] - width < 0) && (direction === -width))||
      ((currentGogh[0] % width === 0) && (direction === -1 ))||
      ((currentGogh[0] + width > width * width) && (direction === +width)) ||
      squares[currentGogh[0]].classList.contains('goghStar')) {
        return clearInterval(interval);
      }

    
    currentGogh.unshift(currentGogh[0] + direction);
    let tail = currentGogh.pop();
    let starTail;
    squares[tail].classList.remove('gogh');

    if(currentGoghStar.length > 0){
      currentGoghStar.unshift(tail);
      starTail = currentGoghStar.pop();
      squares[starTail].classList.remove('goghStar');
        }

    if(squares[currentGogh[0]].classList.contains('star')){
      squares[currentGogh[0]].classList.remove('star');
      
      
      if(currentGoghStar.length > 0){
        squares[starTail].classList.add('goghStar');
        currentGoghStar.push(starTail);
      }
      else{
        squares[tail].classList.add('goghStar');
        currentGoghStar.push(tail);
      }
      randomStar();

      score++;
      scoreDisplay.innerHTML = score;
      clearInterval(interval);
      intervalTime *= speed;
      interval = setInterval(moveOutComes, intervalTime);
    }
    squares[currentGogh[0]].classList.add('gogh');
    squares[currentGoghStar[0]].classList.add('goghStar');
  }


  function randomStar () {
    do {
      starIndex = Math.floor(Math.random() * squares.length);
    } while(squares[starIndex].classList.contains('goghStar'));
    squares[starIndex].classList.add('star');
  }



  function control(e) {
    // squares[currentIndex].classList.remove('gogh');

    //right
    if(e.keyCode === 39) {
      direction = 1;
    } 

    //up
    else if (e.keyCode === 38) {
      direction = -width;
    }

    //left
    else if (e.keyCode === 37) {
      direction = -1;
    }

    //down
    else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);

























})