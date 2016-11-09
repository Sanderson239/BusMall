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
    var tent = JSON.stringify(productArray);
    localStorage.setItem('productArray', JSON.stringify(productArray));
    images.removeEventListener;
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
var buyerData = {
  labels : ['January','February','March','April','May','June'],
  datasets : [
    {
      fillColor : 'rgba(172,194,132,0.4)',
      strokeColor : '#ACC26D',
      pointColor : '#fff',
      pointStrokeColor : '#9DB86D',
      data : [203,156,99,251,305,247]
    }
  ]
};

function renderChart() {
  var labels = [];
  var clickData = [];
  var colors = [];
  var borderColors = [];
  for (var i = 0; i < productArray.length; i++) {
    labels[i] = productArray[i].productName;
    clickData[i] = productArray[i].timesClicked;
    colors[i] = 'rgba(255, 99, 132, 0.2)';
    borderColors[i] = 'rgba(255,99,132,1)';
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

function saveData() {
  if (!supportsLocalStorage()) { return false; }
  localStorage['product data'] = productData;
  for (var i = 0; i < productArray.length; i++) {
    localStorage['product shown'] = productArray[i].timesShown;
    localStorage['product clicks'] = productArray[i].timesClicked;
  }
}
