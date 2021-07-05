'use strict';


let section = document.getElementById('sec-one');
let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let centerImageElement = document.getElementById('center-image');
let indexElement = document.getElementById('index');

let maxAttempts = 25;
let counter = 0;
BusMall.globArr = [];
let arrOfNames = [];
let arrOfVotes = [];
let arrOfShown = [];
let arrOfIndex = [0, 0, 0];





function BusMall(name, source,) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  BusMall.globArr.push(this);
  arrOfNames.push(this.name)
}




new BusMall('bag.jpg', 'image/bag.jpg');
new BusMall('banana.jpg', 'image/banana.jpg');
new BusMall('bathroom.jpg', 'image/bathroom.jpg');
new BusMall('boots.jpg', 'image/boots.jpg');
new BusMall('breakfast.jpg', 'image/breakfast.jpg');
new BusMall('bubblegum.jpg', 'image/bubblegum.jpg');
new BusMall('chair.jpg', 'image/chair.jpg');
new BusMall('cthulhu.jpg', 'image/cthulhu.jpg');
new BusMall('dog-duck.jpg', 'image/dog-duck.jpg');
new BusMall('dragon.jpg', 'image/dragon.jpg');
new BusMall('pen.jpg', 'image/pen.jpg');
new BusMall('pet-sweep.jpg', 'image/pet-sweep.jpg');
new BusMall('scissors.jpg', 'image/scissors.jpg');
new BusMall('shark.jpg', 'image/shark.jpg');
new BusMall('sweep.png', 'image/sweep.png');
new BusMall('tauntaun.jpg', 'image/tauntaun.jpg');
new BusMall('unicorn.jpg', 'image/unicorn.jpg');
new BusMall('water-can.jpg', 'image/water-can.jpg');
new BusMall('wine-glass.jpg', 'image/wine-glass.jpg');



let leftIndex;
let rightIndex;
let centerIndex;

function generateRandomIndex() {
  return Math.floor(Math.random() * BusMall.globArr.length);
}


function renderImages() {
  leftIndex = generateRandomIndex();
  rightIndex = generateRandomIndex();
  centerIndex = generateRandomIndex();





  while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex
    || arrOfIndex.includes(leftIndex) || arrOfIndex.includes(rightIndex) || arrOfIndex.includes(centerIndex)) {

    leftIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();
    centerIndex = generateRandomIndex();


  }
  arrOfIndex[0] = leftIndex;
  arrOfIndex[1] = rightIndex;
  arrOfIndex[2] = centerIndex;


  BusMall.globArr[leftIndex].shown++;
  BusMall.globArr[rightIndex].shown++;
  BusMall.globArr[centerIndex].shown++;

  leftImageElement.src = BusMall.globArr[leftIndex].source;
  rightImageElement.src = BusMall.globArr[rightIndex].source;
  centerImageElement.src = BusMall.globArr[centerIndex].source;
}


renderImages();





section.addEventListener('click', handleClick);
let btnEl;
function handleClick(event) {
  counter++;
  if (maxAttempts > counter) {
    if (event.target.id === 'left-image') {
      BusMall.globArr[leftIndex].votes++;
    } else if (event.target.id === 'right-image') {
      BusMall.globArr[rightIndex].votes++;
    } else if (event.target.id === 'center-image') {
      BusMall.globArr[centerIndex].votes++;

    } else {
      counter--;
      return;
    }

    renderImages();
  } else {
    btnEl = document.getElementById('btn');
    btnEl.addEventListener('click', handelShow);
    section.removeEventListener('click', handleClick);

  }

}
function handelShow() {
  renderList();
  gettingChart();
  btnEl.removeEventListener('click', handelShow);
}

function renderList() {
  section.removeEventListener('click', handleClick);
  let ul = document.getElementById('unList');
  for (let i = 0; i < BusMall.globArr.length; i++) {
    arrOfVotes.push(BusMall.globArr[i].votes)
    arrOfShown.push(BusMall.globArr[i].shown)
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${BusMall.globArr[i].name} has this number of votes ${BusMall.globArr[i].votes} and 
            has this number of shown${BusMall.globArr[i].shown}`
  }

}



function gettingChart() {
  let ctx = document.getElementById('myChart')
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrOfNames,
      datasets: [{
        label: '# of Votes',
        data: arrOfVotes,
        backgroundColor: [
          'rgba(0,255,0,0.3)',
        ],
        borderColor: [
          'rgb(255,255,0,0.3)',
        ],
        borderWidth: 1



      }, {
        label: '# of Shown',
        data: arrOfShown,
        backgroundColor: [
          'rgb(255,255,0,0.3)'
        ],
        borderColor: [
          'rgba(0,255,0,0.3)',
        ],
        borderWidth: 1


      }]
    },
  })
}