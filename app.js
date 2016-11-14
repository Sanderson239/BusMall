'use strict';

var randomProducts = [];
var counter = 0;
if (localStorage.getItem('counter')) {
  counter = JSON.parse(localStorage.getItem('counter'));
}
var productArray;
if (localStorage.getItem('productArray')) {
  productArray = JSON.parse(localStorage.getItem('productArray'));
}


else {
  productArray = [
    new Product('bag', 'images/bag.jpg'),
    new Product('banana', 'images/banana.jpg'),
    new Product('bathroom', 'images/bathroom.jpg'),
    new Product('boots', 'images/boots.jpg'),
    new Product('breakfast', 'images/breakfast.jpg'),
    new Product('bubblegum', 'images/bubblegum.jpg'),
    new Product('chair', 'images/chair.jpg'),
    new Product('cthulhu', 'images/cthulhu.jpg'),
    new Product('dog-duck', 'images/dog-duck.jpg'),
    new Product('dragon', 'images/dragon.jpg'),
    new Product('pen', 'images/pen.jpg'),
    new Product('pet-sweep', 'images/pet-sweep.jpg'),
    new Product('scissors', 'images/scissors.jpg'),
    new Product('shark', 'images/shark.jpg'),
    new Product('sweep', 'images/sweep.png'),
    new Product('tauntaun', 'images/tauntaun.jpg'),
    new Product('unicorn', 'images/unicorn.jpg'),
    new Product('usb', 'images/usb.gif'),
    new Product('water-can', 'images/water-can.jpg'),
    new Product('wine-glass', 'images/wine-glass.jpg')
  ];
}
var oldProductIndexes = [];
var images = document.getElementsByClassName('products');
var topPicks = productArray[0].timesClicked;


function Product(productName, filepath) {
  this.productName = productName;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

function randomImages(event) {
  if (counter < 25) {
    var productIndexes = [];
    clickImage(event);
    for (var i = 0; i < images.length; i++) {
      images.innerHTML = '';
      randomProducts[i] = productArray[Math.floor(Math.random() * productArray.length)];
      var currentProduct = randomProducts[i];
      while (productIndexes.includes(currentProduct) || oldProductIndexes.includes(currentProduct)) {
        currentProduct = productArray[Math.floor(Math.random() * productArray.length)];
      }
      productIndexes[i] = currentProduct;
      images[i].setAttribute('alt', currentProduct.productName);
      images[i].setAttribute('src', currentProduct.filepath);
      images[i].setAttribute('class', 'products');
      currentProduct.timesShown++;
    }
    oldProductIndexes = productIndexes;
    counter++;
  }
  else {
    renderChart();
    localStorage.setItem('counter', JSON.stringify(counter));
    localStorage.setItem('productArray', JSON.stringify(productArray));
    for (var i = 0; i < images.length; i++){
      images[i].addEventListener('click', randomImages);
    };
  }
}

for (var i = 0; i < images.length; i++){
  images[i].addEventListener('click', randomImages);
};

renderChart();

function clickImage(event) {
  for (var i = 0; i < productArray.length; i++) {
    if (event.target.alt === productArray[i].productName) {
      productArray[i].timesClicked++;
    }
  }
}

function topPick() {
  for (var i = 1; i < productArray.length; i++) {
    var j = i - 1;
    if (topPicks < productArray[i].timesClicked) {
      topPicks = productArray[i].timesClicked;
      console.log(topPicks);
      j++;


    }
    else {
      console.log(topPicks);
      j++;

    }
  }
}

function renderChart() {
  topPick();
  var labels = [];
  var clickData = [];
  var colors = [];
  var borderColors = [];
  for (var i = 0; i < productArray.length; i++) {
    labels[i] = productArray[i].productName;
    clickData[i] = productArray[i].timesClicked;
    if (clickData[i] != topPicks) {
      colors[i] = 'rgba(255, 99, 132, 0.2)';
      borderColors[i] = 'rgba(255,99,132,1)';
    }
    else {
      colors[i] = 'rgba(0,255,0,0.2)';
      borderColors[i] = 'rgba(0,255,0,1)';
    }
  }
  var ctx = document.getElementById('buyers').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Product Picks',
        data: clickData,
        backgroundColor: colors,
        borderColor:
        borderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
